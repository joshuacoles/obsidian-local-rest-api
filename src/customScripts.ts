import {z, ZodSchema} from "zod";
import {App} from "obsidian";

export interface CustomScript<T> {
  input: ZodSchema<T>
  execute: (p: App, input: T) => any
}

export const customScripts: Record<string, CustomScript<any>> = {
  'get-day-plan': {
    input: z.array(z.string().date()),
    execute: (app, input) => {
      // @ts-ignore
      return app.plugins.plugins['obsidian-day-planner'].getTasks(
        input.map(dayStr => window.moment(dayStr))
      )
    }
  } as CustomScript<string[]>,
}
