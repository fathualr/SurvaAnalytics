export const mapResponSurveiToRows = (responSurveis, pertanyaanSurveis) => {
  if (!responSurveis?.length) return [];

  const questionMap = pertanyaanSurveis.reduce((acc, q) => {
    acc[q.id] = q.teks_pertanyaan;
    return acc;
  }, {});

  return responSurveis.map(response => {
    const answers = processSurveyAnswers(response.respon, questionMap);

    return {
      'Timestamps (UTC)': response.updated_at,
      'Email': response.Umum?.Pengguna?.email || '-',
      ...answers
    };
  });
};

const processSurveyAnswers = (answers = {}, questionMap) => {
  return Object.entries(questionMap).reduce((result, [id, question]) => {
    const answer = answers[id];
    result[question] = formatAnswerValue(answer);
    return result;
  }, {});
};

const formatAnswerValue = (answer) => {
  if (answer === undefined || answer === null) return '-';
  if (Array.isArray(answer)) return `[${answer.map(v => `"${v}"`).join(', ')}]`;
  return answer;
};
