import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const code=ts.transpileModule(readFileSync(new URL('../app/api/process-check/route.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
function route({storage=true,delivery=true}={}) {
 const writes=[],notices=[],updates=[];
 const db={collection(name){assert.equal(name,'processChecks');return {async add(data){writes.push(data);return {async update(value){updates.push(value);}}}}}};
 const deps={
 '@google-cloud/firestore':{FieldValue:{serverTimestamp:()=> 'SERVER_TIME'}},
 'next/server':{NextResponse:{json:(data,{status})=>Response.json(data,{status})},after:()=>{}},
 '@/lib/config':{SITE:{email:'test@example.invalid'},contactEmail:()=> 'owner@example.invalid'},
 '@/lib/email':{checkBusinessEmail:value=>({ok:true,email:value,domain:'example.invalid'})},
 '@/lib/firestore':{safe:async operation=>storage?operation(db):null},
 '@/lib/mail':{ownerNoticeHtml:value=>JSON.stringify(value),sendMail:async value=>{notices.push(value);return delivery;}},
 '@/lib/ratelimit':{checkPersistentDailyLimit:async()=>true,checkWindowLimit:()=>true,clientIp:()=> 'TEST_IP'},
 '@/lib/retention':{scheduleOpportunisticRetention:()=>{},runRetention:async()=>{},runDailyRetention:async()=>{},runDailyRetentionAfterResponse:()=>{}}
 };
 const exports={};vm.runInNewContext(code,{exports,require:name=>{assert.ok(deps[name],`Unexpected dependency ${name}`);return deps[name];},Request,Response,console,Buffer,TextEncoder});
 return {POST:exports.POST,writes,updates,notices};
}
const body={name:'Test Name',email:'lead@example.invalid',company:'Test company',process:'Reklamationen',volume:'500',message:'Example workflow only',consent:true};
const request=()=>new Request('http://localhost/api/process-check',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
test('durable storage succeeds when notification delivery fails and preserves full lead',async()=>{const r=route({delivery:false});const res=await r.POST(request());assert.equal(res.status,200);assert.deepEqual(await res.json(),{ok:true,persisted:true,delivered:false,message:'Danke. Ihr Prozess-Check wurde sicher gespeichert.'});assert.equal(r.writes[0].email,body.email);assert.equal(r.writes[0].company,body.company);assert.equal(r.writes[0].process,body.process);assert.equal(r.updates[0].deliveryStatus,'not-delivered');});
test('confirmed notification can accept a lead during storage outage',async()=>{const r=route({storage:false});const res=await r.POST(request());const value=await res.json();assert.equal(res.status,200);assert.equal(value.persisted,false);assert.equal(value.delivered,true);assert.match(r.notices[0].html,/lead@example.invalid/);});
test('both failed persistence and failed notification return failure, never success',async()=>{const r=route({storage:false,delivery:false});const res=await r.POST(request());assert.equal(res.status,503);assert.equal((await res.json()).ok,false);});
