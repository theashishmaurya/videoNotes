/**
 * @description Below is the promt for user to select the type of note they want to generate. Remember to add the Mardown Promt to the promt message
 *
 */

export const promtLibrary = {
  Note: {
    prompt:
      "Your job is to convert the Following text into meaning full and insighfull notes in form of Markdown with Headings subheadings, bullet points, etc..",
  },
  Summary: {
    prompt:
      "Your job is to convert the Following text into meaning full and insighfull summary.",
  },
  Blog: {
    prompt:
      "Your job is to convert the Following text into meaning full and insighfull Blog with Into, Body, Conclusion, etc.. and make it human readable and higly engaging.",
  },
} as const;
