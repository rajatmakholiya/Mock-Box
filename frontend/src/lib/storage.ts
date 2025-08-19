import type { SavedTest } from "../types";

const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;

// Function to get valid (non-expired) tests from local storage
export const getSavedTests = (): SavedTest[] => {
  const savedTestsJson = localStorage.getItem("mockTestHistory");
  if (!savedTestsJson) return [];
  
  const savedTests: SavedTest[] = JSON.parse(savedTestsJson);
  const now = Date.now();

  // Filter out tests older than 30 days
  return savedTests.filter(test => (now - test.timestamp) < thirtyDaysInMs);
};

// Function to add a new test to local storage
export const addSavedTest = (newTest: SavedTest) => {
  const currentTests = getSavedTests();
  const updatedTests = [...currentTests, newTest];
  localStorage.setItem("mockTestHistory", JSON.stringify(updatedTests));
};