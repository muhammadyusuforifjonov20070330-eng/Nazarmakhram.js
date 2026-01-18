import React from 'react';

export type ViewType = 'home' | 'courses' | 'teachers' | 'auth' | 'contact' | 'profile' | 'admin';
export type AuthMode = 'login' | 'register';

export interface NavItem {
  label: string;
  id: ViewType;
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface CourseItem {
  id: number;
  title: string;
  level: string;
  description: string;
  duration: string;
  lessons: number;
  price: string;
  features: string[];
  icon: React.ReactNode;
  color: string;
}

export interface TeacherItem {
  id: number;
  name: string;
  role: string;
  experience: string;
  shortDescription: string;
  description: string;
  skills: string[];
  image: string;
  badge?: string;
  badgeIcon?: React.ReactNode;
  stats: { label: string; value: string }[];
}

export interface PaymentRecord {
  id: number;
  date: string;
  amount: string;
  status: 'paid' | 'pending' | 'overdue';
  method: string;
}

export interface Assignment {
  id: number;
  title: string;
  deadline: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: string;
}

export interface ScheduleItem {
  day: string;
  time: string;
  subject: string;
  room: string;
}

export interface StudentProfile {
  name: string;
  id: string;
  avatar: string;
  status: 'active' | 'warning' | 'inactive';
  currentCourse: string;
  teacher: string;
  attendance: number; // percentage
  averageScore: number;
  balance: string;
  nextPaymentDate: string;
  payments: PaymentRecord[];
  assignments: Assignment[];
  schedule: ScheduleItem[];
  rank: number;
}

export interface AdminStats {
  totalStudents: number;
  totalRevenue: string;
  activeCourses: number;
  newRegistrations: number;
}