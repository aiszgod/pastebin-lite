export function getCurrentTime(headers) {
  const testMode = process.env.TEST_MODE === '1';
  
  if (testMode && headers.get('x-test-now-ms')) {
    return parseInt(headers.get('x-test-now-ms'));
  }
  
  return Date.now();
}
