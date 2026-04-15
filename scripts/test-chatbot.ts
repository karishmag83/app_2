import { generateSmartResponse, type ConversationContext } from '../src/sections/aiChatLogic'

const context: ConversationContext = {
  projectsDiscussed: [],
  askedAboutContact: false,
  askedAboutSkills: false,
}

const result = generateSmartResponse('Tell me about your projects', context)

console.log('Response:\n', result.response)
console.log('\nSuggestions:', result.suggestions.join(' | '))
