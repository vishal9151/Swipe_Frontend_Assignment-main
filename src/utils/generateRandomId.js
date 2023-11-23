
function generateRandomId() {
  // Generate a random string of alphanumeric characters
  const randomString = Math.random().toString(36).substring(2, 10);

  // Combine the random string with a timestamp to ensure uniqueness
  const timestamp = new Date().getTime();
  const randomId = `${randomString}_${timestamp}`;

  return randomId;
}

export default generateRandomId;
