// src/services/firestoreCollections.ts
// Thin Firestore CRUD wrappers for each collection.
// The AppContext uses these indirectly via addDoc/deleteDoc,
// but this file provides standalone helpers for use in components
// or Cloud Functions that need direct access.

import { db } from '../firebase';
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
  DocumentData,
} from 'firebase/firestore';

// ── Collection references ────────────────────────────────────────────────
export const colVideos     = collection(db, 'videos');
export const colTests      = collection(db, 'tests');
export const colAttempts   = collection(db, 'attempts');
export const colNotices    = collection(db, 'notices');
export const colFees       = collection(db, 'fees');
export const colUsers      = collection(db, 'users');
export const colStudents   = collection(db, 'students');
export const colMaterials  = collection(db, 'materials');
export const colRoutines   = collection(db, 'routines');
export const colExams      = collection(db, 'exams');
export const colAuditLogs  = collection(db, 'auditLogs');
export const colAttendance = collection(db, 'attendance');

// ── Generic helpers ──────────────────────────────────────────────────────
export async function addDocument<T extends DocumentData>(
  col: ReturnType<typeof collection>,
  data: T
) {
  const docRef = await addDoc(col, {
    ...data,
    createdAt: data.createdAt || Timestamp.now(),
  });
  return docRef.id;
}

export async function deleteDocument(colName: string, id: string) {
  await deleteDoc(doc(db, colName, id));
}

export async function updateDocument(
  colName: string,
  id: string,
  data: Partial<DocumentData>
) {
  await updateDoc(doc(db, colName, id), data);
}

export async function getDocument(colName: string, id: string) {
  const snap = await getDoc(doc(db, colName, id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// ── Query helpers ────────────────────────────────────────────────────────
export async function getVideosByUnit(unit: string) {
  const q = query(colVideos, where('unit', '==', unit), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getNoticesByUnit(unit: string) {
  const q = query(colNotices, where('unit', 'in', [unit, 'All']), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getAttemptsByStudent(email: string) {
  const q = query(colAttempts, where('studentEmail', '==', email));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
