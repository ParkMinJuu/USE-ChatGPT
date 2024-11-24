document.getElementById('novelForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const genre = document.getElementById('genre').value;
  const setting = document.getElementById('setting').value;
  const length = document.getElementById('length').value;

  generateNovel(genre, setting, length);
});

function generateNovel(genre, setting, length) {
  const prompt = `장르: ${genre}, 배경: ${setting}, ${length}개의 챕터로 구성된 소설을 작성해줘.`;

  fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer Your API' 
      },
      body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{role: "user", content: prompt}],
          max_tokens: 1000
      })
  })
  .then(response => response.json())
  .then(data => {
      if (data.choices && data.choices.length > 0) {
          const novelOutput = document.getElementById('novelOutput');
          novelOutput.innerHTML = `<h2>생성된 소설</h2><p>${data.choices[0].message.content}</p>`;
          document.getElementById('editSection').style.display = 'block';
      }
  })
  .catch(error => console.error('Error 발생:', error));
}

// 소설 수정 폼 제출 이벤트 처리
document.getElementById('editForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const editInstructions = document.getElementById('editInstructions').value;
  const originalStory = document.getElementById('novelOutput').innerText;

  const prompt = `다음 소설을 기반으로 ${editInstructions}. 기존 소설 내용:\n\n${originalStory}`;

  fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer Your API' 
      },
      body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{role: "user", content: prompt}],
          max_tokens: 1000
      })
  })
  .then(response => response.json())
  .then(data => {
      if (data.choices && data.choices.length > 0) {
          const newNovelOutput = document.getElementById('newNovelOutput');
          newNovelOutput.innerHTML = `<h2>수정된 소설</h2><p>${data.choices[0].message.content}</p>`;
      }
  })
  .catch(error => {
      console.error('Error 발생:', error);
  });
}); // 이 부분에서 괄호를 정확히 닫아야 합니다.

// 등장인물 추천 기능
document.getElementById('getCharacterSuggestions').addEventListener('click', function () {
  const prompt = "다음 소설에 어울리는 주요 등장인물 3명을 추천해줘: 이름, 나이, 배경, 성격 포함.";

  fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer Your API' 
      },
      body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{role: "user", content: prompt}],
          max_tokens: 500
      })
  })
  .then(response => response.json())
  .then(data => {
      if (data.choices && data.choices.length > 0) {
          const characterSuggestions = document.getElementById('characterSuggestions');
          characterSuggestions.innerHTML = `<h3>추천된 등장인물</h3><p>${data.choices[0].message.content}</p>`;
      }
  })
  .catch(error => {
      console.error('Error 발생:', error);
  });
});