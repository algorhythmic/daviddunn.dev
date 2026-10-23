import { INTRO_ANSWER } from "./site-copy"

export const INTRO_PROMPT = "Hey who is this David dude anyway?"

// One clock keeps typing, the automatic submit, research and the response in sync.
// Skip, replay and reduced motion all use the same end state.
const typeStart = 10
const typed = typeStart + INTRO_PROMPT.length
const submit = typed + 10
const thinkingStart = submit + 8
const researchEnd = thinkingStart + 100
const answerStart = researchEnd + 8
const end = answerStart + Math.ceil(INTRO_ANSWER.trim().split(/\s+/).length / 2) + 10

export const INTRO_TIMING = {
  tickMs: 50,
  typeStart,
  typed,
  submit,
  thinkingStart,
  researchEnd,
  answerStart,
  end,
} as const
