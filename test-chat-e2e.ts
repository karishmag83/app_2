import { generateSmartResponse } from './src/sections/aiChatLogic.ts';

console.log('='.repeat(80));
console.log('AI CHAT END-TO-END FUNCTIONAL TEST');
console.log('='.repeat(80));
console.log('');

const testScenarios = [
  { q: 'Hi there!', type: 'greeting' },
  { q: 'What skills do you have?', type: 'skills' },
  { q: 'Tell me about AI Care Navigator', type: 'projects' },
  { q: 'What services do you offer?', type: 'services' },
  { q: 'How can I hire you?', type: 'contact' },
  { q: 'What are your rates?', type: 'pricing' },
  { q: 'How long will my project take?', type: 'timeline' },
  { q: 'What is your design philosophy?', type: 'philosophy' },
  { q: 'Is she married?', type: 'personal' },
  { q: 'What is her salary?', type: 'personal' },
];

const context = { projectsDiscussed: [], askedAboutContact: false, askedAboutSkills: false };

let passed = 0;
let failed = 0;

testScenarios.forEach((test, i) => {
  console.log(`TEST ${i + 1}/10: "${test.q}"`);
  const result = generateSmartResponse(test.q, context);
  
  const isPersonal = result.response.includes('ask her personally');
  const hasEmail = result.response.includes('karishmaworks08@gmail.com');
  const hasSuggestions = result.suggestions && result.suggestions.length > 0;
  
  // Validation
  let testPassed = true;
  
  if (test.type === 'personal') {
    if (!isPersonal || !hasEmail) {
      console.log(`  ❌ FAILED: Personal question should defer and show email`);
      testPassed = false;
    } else {
      console.log(`  ✅ Correctly deferred to email`);
    }
  } else {
    if (isPersonal) {
      console.log(`  ❌ FAILED: Should not defer, this is an answerable ${test.type} question`);
      testPassed = false;
    } else {
      console.log(`  ✅ Correctly answered`);
    }
  }
  
  console.log(`  📝 Response preview: ${result.response.substring(0, 80)}...`);
  console.log(`  💡 Suggestions: ${result.suggestions.join(' | ')}`);
  console.log('');
  
  if (testPassed) {
    passed++;
  } else {
    failed++;
  }
});

console.log('='.repeat(80));
console.log(`RESULTS: ${passed} passed, ${failed} failed out of ${testScenarios.length} tests`);
console.log('='.repeat(80));

if (failed === 0) {
  console.log('✅ ALL FUNCTIONAL TESTS PASSED!');
  process.exit(0);
} else {
  console.log('❌ SOME TESTS FAILED');
  process.exit(1);
}
