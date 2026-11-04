// CodeLab 챕터별 퀴즈 데이터
// 각 문제: question(질문), options(4지선다), answerIndex(정답 인덱스), explanation(해설)

export const quizzes = {
  html: {
    chapterId: 'html',
    title: 'HTML 퀴즈',
    passMessage: 'HTML의 뼈대가 튼튼해졌어요!',
    questions: [
      {
        question: 'HTML에서 웹페이지의 제목(브라우저 탭에 표시되는 내용)을 지정하는 태그는?',
        options: ['<title>', '<h1>', '<head>', '<meta>'],
        answerIndex: 0,
        explanation:
          '<title> 태그는 <head> 안에 작성하며 브라우저 탭과 검색 결과에 표시되는 문서 제목을 정합니다. <h1>은 화면 본문에 보이는 대제목이라는 점에 주의하세요.',
      },
      {
        question: '다음 중 올바른 HTML 요소의 형태는?',
        options: [
          '<p>안녕하세요</p>',
          '<p>안녕하세요<p>',
          '<p 안녕하세요 />',
          '</p>안녕하세요<p>',
        ],
        answerIndex: 0,
        explanation:
          '대부분의 HTML 요소는 여는 태그 <p>와 닫는 태그 </p>가 한 쌍을 이루며, 그 사이에 콘텐츠가 들어갑니다. 닫는 태그 앞의 슬래시(/)를 빠뜨리면 의도치 않게 요소가 중첩됩니다.',
      },
      {
        question: '다음 중 "시맨틱 태그"에 해당하지 않는 것은?',
        options: ['<article>', '<header>', '<div>', '<footer>'],
        answerIndex: 2,
        explanation:
          '<article>, <header>, <footer>는 의미를 가진 시맨틱 태그입니다. <div>는 division(분할)의 줄임말로 아무 의미도 없이 요소를 묶는 용도로 쓰이는 비시맨틱 태그입니다.',
      },
      {
        question: '폼에서 <label>과 <input>을 올바르게 연결하는 방법은?',
        options: [
          '<label>의 for 속성과 <input>의 id 속성을 같은 값으로 지정한다',
          '<label>의 id 속성과 <input>의 for 속성을 같은 값으로 지정한다',
          '두 태그 사이에 <link> 태그를 넣는다',
          '연결할 필요 없이 name만 같게 한다',
        ],
        answerIndex: 0,
        explanation:
          'label의 for 값과 input의 id 값을 같게 하면 라벨 클릭 시 해당 입력 칸으로 포커스가 이동합니다. 스크린리더도 입력 칸의 용도를 정확히 안내할 수 있어 접근성의 기본입니다.',
      },
    ],
  },
  css: {
    chapterId: 'css',
    title: 'CSS 퀴즈',
    passMessage: 'CSS로 세상을 예쁘게 꾸밀 준비가 됐어요!',
    questions: [
      {
        question: '다음 CSS 코드에서 선택자(selector)는 무엇인가요?\n.card { color: red; }',
        options: ['.card', 'color', 'red', '{ } 안의 전체 내용'],
        answerIndex: 0,
        explanation:
          '선택자는 "스타일을 적용할 대상"을 가리키는 부분입니다. .card는 클래스가 card인 모든 요소를 선택하며, color: red는 속성과 값으로 이루어진 선언(declaration)입니다.',
      },
      {
        question: 'box-sizing: border-box를 적용했을 때의 효과로 올바른 것은?',
        options: [
          '지정한 width가 패딩과 보더를 포함한 전체 너비가 된다',
          '모든 마진이 자동으로 0이 된다',
          '요소들이 무조건 가로 한 줄로 배치된다',
          '테두리가 점선으로 바뀐다',
        ],
        answerIndex: 0,
        explanation:
          '기본값인 content-box는 width가 콘텐츠 영역만의 너비라서 패딩·보더를 더하면 실제 크기가 커집니다. border-box는 width에 패딩과 보더까지 포함되므로 계획한 크기 그대로 화면에 나타나 실무에서 표준처럼 사용합니다.',
      },
      {
        question: 'Flexbox에서 자식 요소를 부모의 정중앙에 배치하는 올바른 조합은?',
        options: [
          '부모에 display: flex; justify-content: center; align-items: center;',
          '부모에 display: flex; 자식에 margin: auto auto;',
          '부모에 text-align: center; vertical-align: middle;',
          '자식에 position: center;',
        ],
        answerIndex: 0,
        explanation:
          'justify-content는 주축(기본 가로) 방향 정렬, align-items는 교차축(세로) 방향 정렬을 담당합니다. 이 둘을 함께 center로 주면 플렉스 아이템이 컨테이너의 정중앙에 위치합니다. position: center 같은 값은 존재하지 않습니다.',
      },
      {
        question: 'Flexbox에서 아이템 사이의 간격을 주는 가장 간단한 방법은?',
        options: [
          '컨테이너에 gap 속성을 사용한다',
          '모든 아이템에 margin: 10px를 준다',
          '아이템 사이에 <br> 태그를 넣는다',
          '컨테이너에 space: 10px를 준다',
        ],
        answerIndex: 0,
        explanation:
          'gap 속성은 플렉스와 그리드 레이아웃에서 아이템 사이 간격을 한 번에 지정합니다. margin을 쓰면 첫 번째·마지막 아이템의 바깥 여백까지 생겨 정렬이 흔들릴 수 있지만, gap은 아이템 "사이"에만 간격을 줍니다.',
      },
    ],
  },
  js: {
    chapterId: 'js',
    title: 'JavaScript 퀴즈',
    passMessage: '이제 웹페이지를 움직일 수 있어요!',
    questions: [
      {
        question: '값이 변경되어야 하는 변수를 선언할 때 사용하는 키워드는?',
        options: ['let', 'const', 'var만 가능', 'variable'],
        answerIndex: 0,
        explanation:
          'let은 값의 재할당이 가능한 변수를 선언할 때 사용합니다. const는 재할당이 불가능한 상수에 쓰이고, 실무에서는 기본적으로 const를 쓰고 변경이 필요할 때만 let을 씁니다.',
      },
      {
        question: '다음 중 자바스크립트의 원시 자료형(primitive type)이 아닌 것은?',
        options: ['객체(object)', '문자열(string)', '숫자(number)', '불리언(boolean)'],
        answerIndex: 0,
        explanation:
          '문자열, 숫자, 불리언은 원시 자료형입니다. 객체는 여러 값을 묶는 참조 자료형으로, 배열과 함수도 객체의 일종입니다.',
      },
      {
        question: "'5' === 5의 평가 결과는?",
        options: ['false', 'true', 'TypeError 발생', 'undefined'],
        answerIndex: 0,
        explanation:
          "===은 값과 자료형이 모두 같아야 true를 반환하는 엄격한 비교 연산자입니다. 문자열 '5'와 숫자 5는 자료형이 다르므로 false입니다. 반면 느슨한 비교인 ==는 자료형을 변환해 비교하므로 '5' == 5는 true가 됩니다.",
      },
      {
        question: '버튼 클릭 시 함수를 실행시키는 올바른 코드는?',
        options: [
          "button.addEventListener('click', handleClick)",
          "button.onEvent('click', handleClick)",
          "button.listen('click', handleClick)",
          "button.clickEvent = handleClick()",
        ],
        answerIndex: 0,
        explanation:
          "addEventListener('이벤트명', 콜백함수)는 지정한 이벤트가 발생했을 때 함수를 실행하는 표준 방법입니다. 마지막 선택지처럼 handleClick()처럼 괄호를 붙이면 클릭과 상관없이 선언 시점에 즉시 실행된다는 점도 기억하세요.",
      },
    ],
  },
  node: {
    chapterId: 'node',
    title: 'Node.js 퀴즈',
    passMessage: '이제 프론트와 백엔드를 잇는 풀스택 개발자로 한 걸음 더!',
    questions: [
      {
        question: 'Node.js에 대한 설명으로 올바른 것은?',
        options: [
          '브라우저 밖에서 JavaScript를 실행할 수 있게 해주는 런타임이다',
          '브라우저 화면을 꾸미는 스타일링 프레임워크다',
          'HTML 문서의 구조를 검사하는 도구다',
          'JavaScript를 새로운 문법으로 바꿔주는 언어다',
        ],
        answerIndex: 0,
        explanation:
          'Node.js는 구글 V8 엔진을 이용해 JavaScript를 브라우저 밖에서 실행할 수 있게 해주는 런타임이에요. 덕분에 배운 문법 그대로 서버를 만들 수 있습니다.',
      },
      {
        question: "'/users/:id' 경로로 요청이 왔을 때 id 갑을 꺼내는 올바른 방법은?",
        options: [
          'req.params.id',
          'req.query.id',
          'req.body.id',
          'req.id',
        ],
        answerIndex: 0,
        explanation:
          "경로의 :id 부분은 req.params에 담겨요. '/users/7'으로 요청하면 req.params.id가 '7'이뒙니다. 반면 req.query는 ? 뒤의 퀴리 문자열을 익을 때 씁니다.",
      },
      {
        question: 'POST 요청의 JSON 본문(body)을 서버에서 익으려면 먼저 해야 할 것은?',
        options: [
          'app.use(express.json()) 미들웨어를 적용한다',
          'res.json()으로 응답을 보낸다',
          'app.get()으로 라우트를 등록한다',
          'node_modules 폴더를 삭제한다',
        ],
        answerIndex: 0,
        explanation:
          'express.json() 미들웨어가 요청 본문의 JSON을 해석해 req.body에 담아줘요. 이 코드가 엡으면 req.body는 비어있는 채로 도착합니다.',
      },
      {
        question: '로컬에서 프론트엔드(5500 포트)가 백엔드(3000 포트)로 요청했을 때 CORS 오류가 났다면 해결 방법은?',
        options: [
          '백엔드에 cors 패키지를 설치하고 app.use(cors())로 허용한다',
          '프론트엔드 코드를 전부 백엔드로 옴긴다',
          '두 서버를 같은 포트로 바꾼다',
          '브라우저 캐시를 삭제한다',
        ],
        answerIndex: 0,
        explanation:
          '포트가 다르면 출처(origin)가 달라져 브라우저가 요청을 막아요. 개발 중에는 백엔드 족에 cors 미들웨어를 적용해 다른 출처의 요청을 허용하는 것이 일반적있습니다.',
      },
    ],
  },
}

export function getQuizByChapterId(chapterId) {
  return quizzes[chapterId] || null
}
