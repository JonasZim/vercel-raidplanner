"use client";

import React from "react";
import { initSetupBoss } from "../../src/utils/loadBoss";
import { initSetupPlayer } from "../../src/utils/loadIcons";
import { AnObject, isAttacks, isToppings } from "../../src/types";
import App from "../../src/components/App";
import {
  updatePlanInDb,
  createPlanFromDb,
  getPlanFromDb,
} from "../../utils/dbqueries/maybeLikeThis";
import { setParentsAndTargetsANew } from "../../utils/PlanRefurbishment";

interface Plan {
  startId: number;
  steps: number[];
  allItems: AnObject[];
}

export default function Page() {
  const [dbId, setDbId] = React.useState<string | undefined>(undefined);
  const [plan, setPlan] = React.useState<Plan | undefined>(undefined);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newDbId = formData.get("dbId") as string;
    getPlanner(newDbId);
  }

  const getPlanner = async (dbId: string) => {
    const res = await getPlanFromDb(dbId);
    if (!res.plan) {
      newPlanner();
    }
    const plan = JSON.parse(res.plan);
    const plan2 = JSON.parse(plan);
    const initState = plan2.allItems;
    initState.forEach((element: AnObject) => {
      if (isAttacks(element) || isToppings(element)) {
        setParentsAndTargetsANew(element, initState);
      }
    });
    setDbId(dbId);
    setPlan(plan2);
  };

  const newPlanner = () => {
    const steps = [0];
    const idStart = 9;
    const playerSetup2 = initSetupPlayer(0);
    const bossSetup2 = initSetupBoss(0);
    const init = [...playerSetup2, ...bossSetup2];
    setPlan({
      startId: idStart,
      steps: steps,
      allItems: init,
    });
  };

  const savePlan = async (plan: Plan) => {
    const planData = JSON.stringify(plan);
    if (dbId) {
      const res = await updatePlanInDb(dbId, planData);
      window.alert("Updated");
    } else {
      const res = await createPlanFromDb(planData);
      setDbId(res.id);
      window.alert("Saved");
    }
  };

  const renderForm = () => {
    if (plan) return;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Enter a your PlanId:
            <input type="number" name="dbId" />
          </label>
          <button type="submit">Submit</button>
        </form>
        <button onClick={() => newPlanner()}>Create new</button>
      </div>
    );
  };

  const renderPlan = () => {
    if (!plan) return;
    return (
      <>
        <App
          initItems={plan.allItems}
          initSteps={plan.steps}
          idStart={plan.startId}
          savePlan={savePlan}
        />
      </>
    );
  };

  const renderId = () => {
    if (!dbId) return;
    return <div>PlanId: {dbId}</div>;
  };

  return (
    <div>
      {renderForm()}
      {renderId()}
      {renderPlan()}
    </div>
  );
}
