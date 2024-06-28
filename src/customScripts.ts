import {z, ZodSchema} from "zod";
import {App, PluginManifest} from "obsidian";
import {Moment} from "moment";

export interface CustomScript<T> {
  input: ZodSchema<T>
  execute: (p: App, input: T) => any
}

interface ObsidianDayPlannerPlugin extends PluginManifest {
  getTasks(visibleDays: Moment[]): object
}

const getDayPlan: CustomScript<string[]> = {
  input: z.array(z.string()),
  execute: (app, input) => {
    return (app.plugins.plugins['obsidian-day-planner'] as ObsidianDayPlannerPlugin).getTasks(
      input.map(dayStr => window.moment(dayStr))
    )
  }
}

export const customScripts: Record<string, CustomScript<any>> = {
  'get-day-plan': getDayPlan,
}
