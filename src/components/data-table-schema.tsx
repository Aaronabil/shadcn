   // src/components/data-table-schema.ts
   import { z } from "zod";

   export const schema = z.object({
     id: z.number(),
     header: z.string(),
     type: z.string(),
     status: z.string(),
     target: z.string(),
     limit: z.string(),
     reviewer: z.string(),
   });
