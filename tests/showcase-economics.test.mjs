import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
const source=ts.transpileModule(readFileSync(new URL("../lib/showcase-economics.ts",import.meta.url),"utf8"),{compilerOptions:{module:ts.ModuleKind.ES2022}}).outputText;
const { projectEconomics }=await import("data:text/javascript;base64,"+Buffer.from(source).toString("base64"));
const base={electricity:62,hours:7200,capex:850};
test("showcase project reconciles cashflow, NPV, IRR and simple payback",()=>{
  const r=projectEconomics(base);
  assert.ok(Math.abs(r.revenue-705.6)<1e-8);
  assert.ok(Math.abs(r.cashflow-116.4)<1e-8);
  const expected=-850+Array.from({length:20},(_,i)=>116.4/1.1**(i+1)).reduce((a,b)=>a+b,0);
  assert.ok(Math.abs(r.npv-expected)<1e-8);
  const atIrr=-850+Array.from({length:20},(_,i)=>116.4/(1+r.irr)**(i+1)).reduce((a,b)=>a+b,0);
  assert.ok(Math.abs(atIrr)<1e-7);
  assert.ok(Math.abs(r.payback-850/116.4)<1e-8);
});
test("more expensive electricity reduces returns; lower CAPEX improves them",()=>{
 const r=projectEconomics(base), high=projectEconomics({...base,electricity:80}), low=projectEconomics({...base,capex:700});
 assert.ok(high.npv<r.npv);
 assert.ok(low.npv>r.npv && low.irr>r.irr && low.payback<r.payback);
});
test("loss-making and long-payback cases never fabricate a return",()=>{
 const loss=projectEconomics({...base,electricity:120});
 assert.equal(loss.irr,null);assert.equal(loss.payback,null);assert.ok(loss.npv<0);
 const slow=projectEconomics({...base,capex:4000});
 assert.equal(slow.payback,null);assert.ok(slow.irr<0);
});
test("invalid economic assumptions fail explicitly",()=>{
 for(const input of [{...base,capex:0},{...base,hours:9000},{...base,electricity:NaN},{...base,electricity:-1}]) assert.throws(()=>projectEconomics(input));
});
