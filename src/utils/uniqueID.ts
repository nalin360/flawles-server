import crypto from 'crypto';

// Utility function to create a unique ID
export const createUniqueId = (): string => {
 // Generate a random number using crypto for better randomness
 const randomNumber = crypto.randomBytes(4).toString('hex');
 // Get the current timestamp
 const timestamp = Date.now();
 // Combine the timestamp and random number to create a unique ID
 return `${timestamp}-${randomNumber}`;
};
