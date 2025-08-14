import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
});

export const exercises = pgTable("exercises", {
  id: text("id").primaryKey(),
  userId: text("user_id"),
  name: varchar("name", { length: 100 }).notNull().unique(),
  muscleGroupId: text("muscle_group_id").references(() => muscleGroups.id),
});

export const workouts = pgTable("workouts", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => user.id),
  name: varchar("name", { length: 100 }).notNull(),
  workoutDate: date("workout_date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const workoutExercises = pgTable("workout_exercises", {
  id: text("id").primaryKey(),
  workoutId: text("workout_id").references(() => workouts.id, {
    onDelete: "cascade",
  }),
  exerciseId: text("exercise_id").references(() => exercises.id),
  note: text("note"),
  order: integer("order"),
});

export const sets = pgTable("sets", {
  id: text("id").primaryKey(),
  workoutExerciseId: text("workout_exercise_id").references(
    () => workoutExercises.id,
    { onDelete: "cascade" },
  ),
  weight: numeric("weight", { precision: 8, scale: 2 }),
  reps: integer("reps"),
  order: integer("order"),
});

export const userWeight = pgTable("user_weight", {
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  weight: numeric("weight", { precision: 8, scale: 2 }).notNull(),
});

export const userGoals = pgTable("user_goals", {
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  squat: numeric("squat", { precision: 8, scale: 2 }),
  bench: numeric("bench", { precision: 8, scale: 2 }),
  deadlift: numeric("deadlift", { precision: 8, scale: 2 }),
});

export const muscleGroups = pgTable("muscle_groups", {
  id: text("id").notNull(),
  muscleGroup: text("muscle_group").notNull(),
});

/* --- Relations --- */

export const exercisesRelations = relations(exercises, ({ many, one }) => ({
  workoutExercises: many(workoutExercises),
  muscleGroup: one(muscleGroups, {
    fields: [exercises.muscleGroupId],
    references: [muscleGroups.id],
  }),
}));

export const workoutsRelations = relations(workouts, ({ many, one }) => ({
  workoutExercises: many(workoutExercises),
  user: one(user, {
    fields: [workouts.userId],
    references: [user.id],
  }),
}));

export const workoutExercisesRelations = relations(
  workoutExercises,
  ({ one, many }) => ({
    workout: one(workouts, {
      fields: [workoutExercises.workoutId],
      references: [workouts.id],
    }),
    exercise: one(exercises, {
      fields: [workoutExercises.exerciseId],
      references: [exercises.id],
    }),
    sets: many(sets),
  }),
);

export const setsRelations = relations(sets, ({ one }) => ({
  workoutExercise: one(workoutExercises, {
    fields: [sets.workoutExerciseId],
    references: [workoutExercises.id],
  }),
}));

export const userWeightRelations = relations(userWeight, ({ one }) => ({
  user: one(user, {
    fields: [userWeight.userId],
    references: [user.id],
  }),
}));

export const userGolalsRelations = relations(userGoals, ({ one }) => ({
  user: one(user, {
    fields: [userGoals.userId],
    references: [user.id],
  }),
}));

export const muscleGroupsRelations = relations(muscleGroups, ({ many }) => ({
  exercises: many(exercises),
}));
