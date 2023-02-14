// recipeService.ts

import { createClient } from "@supabase/supabase-js";
import { Todo } from "./store";

export const supabaseClient = createClient(
  "https://uwahywghntxonssftwmxx.supabase.co",

  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3YWh5d2dobnR4b25zc2Z0d214Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUyMDc4MTEsImV4cCI6MTk5MDc4MzgxMX0.5IB1Zvky4xy_R2qb5dunjzBReTF2sfSaU2QJeOALvo8"
);

export const addTodoService = async (todo: Todo) => {
  const { data } = await supabaseClient.from("todos").insert({ todo });
  return (data as unknown) as Todo;
};

export const removeTodoService = async (todo: Todo) => {
  await supabaseClient.from("todos").delete().eq("id", todo.id);
  return todo;
};

export const updateTodoService = async (todo: Todo) => {
  const { data } = await supabaseClient
    .from("todos")
    .update({ todo })
    .eq("id", todo.id);
  return data;
};

export const getTodosService = async () => {
  const { data } = await supabaseClient.from("todos").select("*");
  return data;
};
