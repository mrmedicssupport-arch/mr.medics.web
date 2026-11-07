import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from './firebase';

/**
 * Safely persists a lead in Firestore only if the user is authenticated.
 * Errors are caught silently so user actions like WhatsApp opening are never blocked.
 */
export async function logLeadSafely(data: Record<string, any>) {
  try {
    if (!auth.currentUser) return;
    
    const cleanData: Record<string, any> = {
      ...data,
      userId: auth.currentUser.uid,
      userEmail: auth.currentUser.email || '',
      createdAt: serverTimestamp(),
    };

    // Filter out undefined values
    Object.keys(cleanData).forEach((key) => {
      if (cleanData[key] === undefined) {
        delete cleanData[key];
      }
    });

    await addDoc(collection(db, 'leads'), cleanData);
  } catch (err) {
    // Failures must NEVER block user workflow or WhatsApp redirects
    console.warn('Optional lead tracking skipped:', err);
  }
}
