import { redirect } from "next/navigation";

/* On-domain booking entry point. Keeps the third-party scheduler URL out of
   the nav/markup (the bare calendly.com link read as "two people"). Eventual
   proper fix: a cal.com custom domain on book.apriori.work / apriori.work. */
const SCHEDULER_URL = "https://calendly.com/rahul-bissa-apriori/30min";

export default function Book() {
  redirect(SCHEDULER_URL);
}
