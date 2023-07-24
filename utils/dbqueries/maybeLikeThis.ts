export const getPlanFromDb = async (id: string) => {
  const res = await fetch(
    `http://localhost:3000/api/prismatests/get-db-entry/${id}`
  );
  const plan = await res.json();
  if (plan) {
    return plan;
  }
  return null;
};

export const updatePlanInDb = async (id: string, plan: string) => {
  const res = await fetch(
    `http://localhost:3000/api/prismatests/update-db-entry/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plan }),
    }
  );
  const updatedPlan = await res.json();
  return updatedPlan;
};

export const createPlanFromDb = async (plan: string) => {
  const res = await fetch(
    `http://localhost:3000/api/prismatests/create-db-entry`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plan }),
    }
  );
  const createdPlan = await res.json();
  return createdPlan;
};
