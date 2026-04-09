import { createContext, useContext, useState, useMemo } from 'react';

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

function computeOutcomes({ weeklyHours, monthlyIncome, sideHustle, riskTaking, jobChanges, wealthImportance }) {
  const incomeNorm = Math.min((monthlyIncome - 2000) / 13000, 1);
  const hoursNorm = (weeklyHours - 20) / 60;
  const side = sideHustle ? 1 : 0;

  const freeTime = Math.round(Math.max(1, 10 - hoursNorm * 6 - side * 1.5));
  const stress = Math.round(Math.min(10, hoursNorm * 4 + (riskTaking / 10) * 3 + wealthImportance * 0.3 + side * 1.2));
  const social = Math.round(Math.max(1, 10 - hoursNorm * 4 - side * 1.5 - jobChanges * 0.2));
  const mental = Math.round(Math.max(1, 10 - stress * 0.7 - hoursNorm * 2));
  const jobSat = Math.round(Math.min(10, Math.max(1, incomeNorm * 4 + 5 - hoursNorm * 3 - riskTaking * 0.2)));
  const relation = Math.round(Math.max(1, 10 - hoursNorm * 3 - side * 2 - jobChanges * 0.3));

  return { freeTime, stress, social, mental, jobSat, relation };
}

export function AppProvider({ children }) {
  const [weeklyHours, setWeeklyHours] = useState(40);
  const [monthlyIncome, setMonthlyIncome] = useState(5000);
  const [wealthImportance, setWealthImportance] = useState(7);
  const [riskAppetite, setRiskAppetite] = useState(5);
  const [jobChanges, setJobChanges] = useState(2);
  const [sideHustle, setSideHustle] = useState(false);

  const outcomes = useMemo(() => computeOutcomes({ 
    weeklyHours, 
    monthlyIncome, 
    sideHustle, 
    riskTaking: riskAppetite, 
    jobChanges, 
    wealthImportance 
  }), [weeklyHours, monthlyIncome, sideHustle, riskAppetite, jobChanges, wealthImportance]);

  const scoreRaw = outcomes.freeTime + (10 - outcomes.stress) + outcomes.social + outcomes.mental + outcomes.jobSat + outcomes.relation;
  const lifeQualityScore = Math.round((scoreRaw / 60) * 100);

  const value = {
    weeklyHours, setWeeklyHours,
    monthlyIncome, setMonthlyIncome,
    wealthImportance, setWealthImportance,
    riskAppetite, setRiskAppetite,
    jobChanges, setJobChanges,
    sideHustle, setSideHustle,
    outcomes,
    lifeQualityScore,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
