import {z, ZodSchema} from "zod";

export interface CustomScript<T> {
  input: ZodSchema<T>
  execute: (input: T) => any
}

export const customScripts: Record<string, CustomScript<any>> = {
  'get-day-plan': {
    input: z.array(z.string().date()),
    execute: (input: string[]) => {
      // @ts-ignore
      return this.app.plugins.plugins['obsidian-day-planner'].getTasks(
        input.map(dayStr => window.moment(dayStr))
      )
    }
  }
}
