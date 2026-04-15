// Comprehensive list of private/personal/unanswerable question patterns
// These questions should be deferred to personal contact

export const privateQuestionPatterns = [
  // Personal Information
  /\b(father|mother|parent|brother|sister|sibling|family|relative|husband|wife|partner|boyfriend|girlfriend|child|son|daughter)('s)?\s*(name|age|job|work)/i,
  /\bwhat('s| is| are) (her|his|their) (father|mother|parent|brother|sister|family|relative)/i,
  /\bdoes she have (any )?(siblings|brothers|sisters|children|kids|pets)/i,
  /\bis she (married|single|dating|engaged)/i,
  /\bwhere (does|did) she (grow up|live|born)/i,
  /\bhow old (is she|are you)/i,
  /\b(age|birthday|birth date|date of birth)/i,
  /\bwhat('s| is) (her|your) (favorite|favourite) (color|colour|food|movie|book|song|band)/i,
  /\b(religion|religious|faith|belief|political|politics|vote)/i,
  /\b(salary|income|earn|pay|compensation|net worth)/i,
  /\b(address|phone number|mobile|cell|personal)/i,
  /\b(medical|health|illness|disease|condition)/i,
  
  // Current Status & Future Plans
  /\b(currently working|working currently|current job|current position|current role)/i,
  /\bwhere (does|is) she (work|working|employed)/i,
  /\b(current project|working on now|current focus)/i,
  /\bwhat (is she|are you) working on (now|currently|right now|these days|today)/i,
  /\b(goals|aims?|aspirations?|ambitions?|dreams?)/i,
  /\bwhere (does|do) (she|you) see (herself|yourself) (in|within)/i,
  /\b(future plans?|next steps?|upcoming|planning to)/i,
  /\bwhat('s| is) next (for her|for you)/i,
  /\b(looking for|seeking|searching for) (a job|work|employment|opportunity)/i,
  
  // Opinions & Preferences
  /\bwhat (does|do) (she|you) think (about|of)/i,
  /\b(opinion|view|thoughts?) (on|about|regarding)/i,
  /\b(prefer|like|dislike|hate|love) (more|better)/i,
  /\b(favorite|favourite|best|worst)/i,
  
  // Lifestyle & Personal Habits
  /\b(hobbies|interests|free time|spare time|weekend)/i,
  /\b(exercise|workout|fitness|gym)/i,
  /\b(diet|eating|food preferences)/i,
  /\b(sleep|wake up|morning routine|daily routine)/i,
  /\b(vacation|holiday|travel|trip)/i,
  /\b(pets|animals|dog|cat)/i,
  
  // Social & Relationships
  /\b(friends|social|network|connections)/i,
  /\b(dating|relationship|romantic)/i,
  /\b(mentor|mentee|advice|guidance)/i,
  
  // Specific Timeframes
  /\b(right now|currently|at the moment|these days|this week|this month|this year)/i,
  /\bin (the )?(next|coming|following) (week|month|year|few)/i,
  /\b(recently|lately|just|newly)/i,
  
  // Unanswerable Questions
  /\b(will she|would she|can she|should she)/i,
  /\bif (she|you) (could|would|had)/i,
  /\bhypothetical|imagine|suppose|what if/i,
]

// Additional keyword-based detection for personal questions
export const privateKeywords = [
  'salary', 'income', 'age', 'birthday', 'married', 'single', 'dating',
  'family', 'father', 'mother', 'sibling', 'children', 'kids',
  'address', 'phone', 'personal', 'private',
  'medical', 'health', 'religion', 'political',
  'boyfriend', 'girlfriend', 'husband', 'wife', 'partner',
  'currently working', 'working now', 'right now',
  'future plans', 'next steps', 'upcoming',
  'goals', 'aims', 'aspirations', 'dreams',
  'favorite', 'favourite', 'prefer', 'opinion',
  'hobbies', 'interests', 'pets', 'vacation',
]

export const isPrivateQuestion = (message: string): boolean => {
  const msg = message.toLowerCase()
  
  // Check against all patterns
  for (const pattern of privateQuestionPatterns) {
    if (pattern.test(msg)) {
      return true
    }
  }
  
  // Check for private keywords
  for (const keyword of privateKeywords) {
    if (msg.includes(keyword.toLowerCase())) {
      return true
    }
  }
  
  return false
}
