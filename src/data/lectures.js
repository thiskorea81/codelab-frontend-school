// CodeLab 강의 콘텐츠 데이터
// 콘텐츠 블록 타입: paragraph(본문) / heading(소제목) / code(코드 예제) / tip(팁 박스)

export const chapters = [
  {
    id: 'html',
    number: 1,
    title: 'HTML — 웹의 뼈대',
    shortTitle: 'HTML',
    description:
      '웹페이지의 뼈대를 만드는 마크업 언어 HTML. 태그의 기본 개념부터 시맨틱 레이아웃과 폼까지, 구조를 잡는 법을 배웁니다.',
    lessons: [
      {
        id: 'html-1',
        title: 'HTML이란? 첫 웹페이지 만들기',
        duration: 15,
        summary: 'HTML의 정의와 태그 구조를 이해하고, 첫 웹페이지를 직접 만들어 봅니다.',
        content: [
          {
            type: 'paragraph',
            text: 'HTML(HyperText Markup Language)은 웹페이지의 구조를 정의하는 마크업 언어입니다. 화면에 보이는 제목, 문단, 이미지, 링크 같은 요소들이 각각 무엇인지를 브라우저에게 알려주는 역할을 해요. HTML은 프로그래밍 언어라기보다는 "콘텐츠에 의미를 붙이는 언어"에 가깝습니다. CSS가 꾸미는 일을, JavaScript가 동작을 담당한다면 HTML은 웹의 골격을 세우는 기초 공사라고 할 수 있어요.',
          },
          {
            type: 'paragraph',
            text: 'HTML은 "태그(Tag)"라는 단위로 이루어져 있습니다. 태그는 보통 여는 태그와 닫는 태그가 한 쌍을 이루며, 그 사이에 콘텐츠가 들어갑니다. 예를 들어 <p>Hello</p>는 "Hello라는 문장을 하나의 문단으로 취급해 달라"는 의미예요. 일부 태그(<img>, <br> 등)는 닫는 태그 없이 단독으로 쓰이기도 합니다.',
          },
          {
            type: 'heading',
            text: 'HTML 문서의 기본 구조',
          },
          {
            type: 'paragraph',
            text: '모든 HTML 문서는 아래와 같은 골격에서 출발합니다. <!DOCTYPE html>은 "이 문서는 HTML5로 작성되었다"는 선언이고, <html> 태그가 문서 전체를 감싸며, <head>에는 문서의 메타 정보(문서 제목, 인코딩 등)를, <body>에는 실제 화면에 보여질 콘텐츠를 작성합니다.',
          },
          {
            type: 'code',
            language: 'html',
            filename: 'index.html',
            code: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" /> <!-- 한글 깨짐 방지 -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>나의 첫 웹페이지</title> <!-- 브라우저 탭에 표시되는 제목 -->
</head>
<body>
  <h1>안녕하세요!</h1>
  <p>제가 만든 첫 웹페이지입니다.</p>
</body>
</html>`,
          },
          {
            type: 'heading',
            text: '태그에 속성(attribute) 주기',
          },
          {
            type: 'paragraph',
            text: '태그에는 class나 id 같은 속성을 붙여서 추가 정보를 줄 수 있습니다. 특히 lang="ko"처럼 문서의 언어를 명시하면 검색 엔진과 보조 기기(스크린리더 등)가 문서를 더 정확하게 해석할 수 있어요.',
          },
          {
            type: 'code',
            language: 'html',
            filename: 'content.html',
            code: `<body>
  <!-- h1은 페이지당 보통 하나만 쓰는 대제목 -->
  <h1>CodeLab 프론트엔드 스쿨</h1>

  <!-- class 속성으로 스타일/스크립트에서 찾기 쉽게 이름표를 붙임 -->
  <p class="intro">웹 개발, 여기서 시작하세요.</p>

  <!-- br은 줄바꿈 (닫는 태그가 없는 빈 요소) -->
  <p>HTML부터 차근차근<br />배워 봅시다.</p>
</body>`,
          },
          {
            type: 'tip',
            title: '알아두면 좋아요',
            text: '파일을 저장할 때는 반드시 확장자를 .html로 저장하고, 인코딩을 UTF-8로 선택하세요. VS Code를 쓰신다면 "Live Server" 확장을 설치하면 저장할 때마다 브라우저가 자동으로 새로고침되어 편리합니다.',
          },
        ],
      },
      {
        id: 'html-2',
        title: '텍스트와 링크 다루기',
        duration: 20,
        summary: '제목·문단·강조 태그와 하이퍼링크(a 태그)로 텍스트 콘텐츠를 완성합니다.',
        content: [
          {
            type: 'paragraph',
            text: '텍스트는 대부분의 웹페이지에서 가장 많은 비중을 차지하는 콘텐츠입니다. HTML은 텍스트의 역할에 따라 <h1>~<h6> 제목 태그, <p> 문단 태그, 그리고 <strong>(중요), <em>(강조), <mark>(하이라이트) 같은 인라인 태그를 제공해요. 제목은 숫자가 작을수록 큰 제목이며, 페이지 전체의 목차와 같이 계층을 잘 나누어 작성하는 것이 중요합니다.',
          },
          {
            type: 'paragraph',
            text: '하이퍼링크는 HTML의 핵심인 "HyperText"의 주인공입니다. <a> 태그의 href 속성에 이동할 주소를 적으면 그만큼 간단하게 링크가 만들어져요. 같은 사이트 안의 페이지라면 상대 경로, 다른 사이트라면 https:// 로 시작하는 절대 경로를 사용합니다.',
          },
          {
            type: 'heading',
            text: '텍스트 요소 다양하게 써보기',
          },
          {
            type: 'code',
            language: 'html',
            filename: 'text.html',
            code: `<h1>프론트엔드 로드맵</h1>
<h2>1단계: HTML</h2>
<p>
  <strong>HTML은 구조를 담당합니다.</strong>
  <em>시맨틱하게</em> 작성할수록 좋습니다.
  중요한 부분은 <mark>형광펜</mark>처럼 표시할 수도 있어요.
</p>
<p>취소선은 <del>이 태그</del>, 밑줄은 <ins>이 태그</ins>로 표현합니다.</p>`,
          },
          {
            type: 'heading',
            text: '링크 걸기: 남의 사이트와 우리 사이트',
          },
          {
            type: 'code',
            language: 'html',
            filename: 'link.html',
            code: `<!-- 새 탭에서 열기: target과 rel을 함께 쓰는 게 안전합니다 -->
<a href="https://developer.mozilla.org/ko/" target="_blank" rel="noopener">
  MDN 문서 열기
</a>

<!-- 같은 폴더 안의 about.html로 이동 (상대 경로) -->
<a href="./about.html">소개 페이지</a>

<!-- 페이지 안의 특정 위치로 이동 (id와 # 조합) -->
<a href="#curriculum">커리큘럼으로 바로가기</a>`,
          },
          {
            type: 'tip',
            title: '알아두면 좋아요',
            text: 'target="_blank"로 새 탭을 열 때는 반드시 rel="noopener"를 함께 쓰세요. 열린 페이지가 window.opener를 통해 원래 페이지를 조작하는 보안 문제를 막아줍니다. 최신 브라우저는 기본으로 차단하지만, 명시하는 습관이 안전합니다.',
          },
        ],
      },
      {
        id: 'html-3',
        title: '이미지와 시맨틱 레이아웃',
        duration: 20,
        summary: 'img 태그와 alt 속성의 의미, header·main·footer 같은 시맨틱 레이아웃 태그를 배웁니다.',
        content: [
          {
            type: 'paragraph',
            text: '이미지는 <img> 태그로 넣습니다. src(이미지 주소)와 alt(대체 텍스트) 두 가지 속성이 핵심이에요. alt는 이미지를 볼 수 없는 환경(스크린리더 사용자, 이미지 로딩 실패, 검색 엔진)에서 이미지를 대신 설명해 주는 문장입니다. "그림에 있는 글자를 그대로 옮겨 적고, 의미가 없는 장식 이미지라면 alt를 빈 값(alt="")으로 둔다"가 기본 원칙입니다.',
          },
          {
            type: 'paragraph',
            text: '시맨틱 태그는 "의미가 있는 태그"라는 뜻입니다. 예전에는 레이아웃을 <div>만으로 만들어서 어디가 헤더이고 어디가 본문인지 알기 어려웠는데, HTML5부터는 <header>, <nav>, <main>, <section>, <article>, <aside>, <footer> 같은 태그를 쓰면 문서 구조가 코드만 봐도 파악됩니다. 검색 엔진 최적화(SEO)와 웹 접근성에도 직접적인 영향을 줘요.',
          },
          {
            type: 'heading',
            text: '이미지 넣기',
          },
          {
            type: 'code',
            language: 'html',
            filename: 'image.html',
            code: `<!-- 인터넷에 있는 이미지 -->
<img src="https://picsum.photos/400/200" alt="무작위로 제공되는 예시 이미지" />

<!-- 우리 폴더의 이미지 + 크기 지정 (가로세로 비율 유지 추천) -->
<img src="./images/logo.png" alt="CodeLab 로고" width="120" height="40" />`,
          },
          {
            type: 'heading',
            text: '시맨틱으로 페이지 골격 잡기',
          },
          {
            type: 'code',
            language: 'html',
            filename: 'layout.html',
            code: `<body>
  <header>
    <h1>CodeLab</h1>
    <nav>
      <a href="/curriculum">커리큘럼</a>
      <a href="/playground">플레이그라운드</a>
    </nav>
  </header>

  <main>
    <section aria-label="오늘의 강의">
      <h2>오늘의 강의</h2>
      <article>
        <h3>박스 모델 완전 정복</h3>
        <p>margin과 padding의 차이를 정리합니다.</p>
      </article>
    </section>

    <aside>광고나 보조 메뉴가 들어가는 영역</aside>
  </main>

  <footer>© 2026 CodeLab — 프론트엔드 스쿨</footer>
</body>`,
          },
          {
            type: 'tip',
            title: '알아두면 좋아요',
            text: '<main> 태그는 페이지에 단 하나만 존재해야 합니다. 본문의 핵심 콘텐츠를 감싸는 용도이고, 스크린리더 사용자가 "본문으로 바로가기"를 쓸 수 있게 해줍니다. 의미 없는 묶음용 태그가 필요할 때는 시맨틱 태그 대신 <div>를 사용하면 됩니다.',
          },
        ],
      },
      {
        id: 'html-4',
        title: '폼으로 사용자 입력 받기',
        duration: 25,
        summary: 'input, label, select, button으로 로그인·가입 폼을 만들고 기본 검증을 적용합니다.',
        content: [
          {
            type: 'paragraph',
            text: '폼(Form)은 사용자에게 정보를 입력받는 창구입니다. 로그인, 검색, 댓글 작성 등 웹에서 하는 대부분의 상호작용이 폼에서 시작돼요. <form> 태그 안에 <input>, <textarea>, <select> 같은 입력 요소와 <button type="submit">을 넣으면, 제출했을 때 입력값을 서버로 보내거나 JavaScript로 처리할 수 있습니다.',
          },
          {
            type: 'paragraph',
            text: '폼에서 가장 중요한 원칙은 "label과 입력 요소를 반드시 연결하는 것"입니다. label의 for 속성값과 input의 id 속성값을 같게 만들면, 사용자가 라벨을 클릭하면 해당 입력 칸에 포커스가 이동합니다. 스크린리더도 "이메일, 입력 칸"처럼 안내할 수 있어 접근성의 기본이 됩니다.',
          },
          {
            type: 'heading',
            text: '로그인 폼 만들기',
          },
          {
            type: 'code',
            language: 'html',
            filename: 'login.html',
            code: `<form action="/login" method="post">
  <!-- label for = input id, 이 둘은 반드시 같게! -->
  <label for="email">이메일</label>
  <input type="email" id="email" name="email" placeholder="name@example.com" required />

  <label for="pw">비밀번호</label>
  <input type="password" id="pw" name="password" minlength="8" required />

  <label>
    <!-- label 안에 input을 감싸면 for/id 없이도 연결됩니다 -->
    <input type="checkbox" name="remember" /> 로그인 상태 유지
  </label>

  <button type="submit">로그인</button>
</form>`,
          },
          {
            type: 'heading',
            text: '다양한 입력 타입',
          },
          {
            type: 'code',
            language: 'html',
            filename: 'inputs.html',
            code: `<!-- 드롭다운 선택 -->
<label for="level">현재 실력</label>
<select id="level" name="level">
  <option value="beginner">입문</option>
  <option value="junior">초급</option>
</select>

<!-- 라디오: 같은 name끼리 하나만 선택 -->
<input type="radio" id="r1" name="goal" value="job" />
<label for="r1">취업 목표</label>

<!-- 긴 문장 입력 -->
<label for="bio">자기소개</label>
<textarea id="bio" rows="4" maxlength="200"></textarea>`,
          },
          {
            type: 'tip',
            title: '알아두면 좋아요',
            text: 'required, type="email", minlength 같은 속성만으로도 브라우저 기본 검증이 작동합니다. 하지만 사용자가 검증을 우회할 수 있으므로, 실제 서비스에서는 서버 측 검증이 반드시 필요합니다. 프론트엔드 검증은 "편의를 위한 1차 방어선"으로 생각하세요.',
          },
        ],
      },
    ],
  },
  {
    id: 'css',
    number: 2,
    title: 'CSS — 웹을 꾸미는 언어',
    shortTitle: 'CSS',
    description:
      '선택자, 색상과 타이포그래피, 박스 모델, Flexbox까지. 예쁘고 안정적인 레이아웃을 만드는 CSS 핵심을 배웁니다.',
    lessons: [
      {
        id: 'css-1',
        title: 'CSS 시작하기와 선택자',
        duration: 20,
        summary: 'CSS 규칙의 구조와 3가지 적용 방법, 그리고 요소·클래스·ID 선택자의 차이를 배웁니다.',
        content: [
          {
            type: 'paragraph',
            text: 'CSS(Cascading Style Sheets)는 HTML로 만든 뼈대에 디자인을 입히는 언어입니다. "Cascading"은 "위에서 아래로 흐른다"는 뜻으로, 여러 스타일 규칙이 충돌할 때 우선순위에 따라 하나로 정해진다는 의미예요. 색상, 크기, 여백, 배치까지 화면의 모든 시각적 표현은 CSS가 담당합니다.',
          },
          {
            type: 'paragraph',
            text: 'CSS 규칙은 "선택자(selector) + 선언부"로 이루어집니다. 선택자는 "누구에게" 스타일을 줄지, 선언부의 속성과 값은 "무엇을 어떻게" 바꿀지를 나타내요. CSS를 HTML에 적용하는 방법은 3가지가 있는데, 재사용과 유지보수를 위해 별도의 .css 파일로 작성해 <link>로 연결하는 "외부 스타일시트"를 가장 권장합니다.',
          },
          {
            type: 'heading',
            text: 'CSS 규칙의 기본 형태',
          },
          {
            type: 'code',
            language: 'css',
            filename: 'style.css',
            code: `/* 선택자 { 속성: 값; } 의 형태 */
p {
  color: #333333;      /* 글자색 */
  font-size: 16px;     /* 글자 크기 */
  margin-bottom: 24px; /* 아래쪽 여백 */
}

/* 여러 선택자를 쉼표로 묶어 같은 스타일을 한 번에 */
h1, h2, h3 {
  font-weight: 700;
}`,
          },
          {
            type: 'heading',
            text: '요소, 클래스, ID 선택자',
          },
          {
            type: 'code',
            language: 'css',
            filename: 'selector.css',
            code: `/* 요소 선택자: 모든 <p>에 적용 */
p { line-height: 1.6; }

/* 클래스 선택자: .으로 시작, 같은 클래스를 가진 모든 요소에 적용 */
.card { background: #ffffff; }

/* ID 선택자: #으로 시작, 페이지에 단 하나의 요소에 적용 */
#header { position: sticky; }

/* 자식/후손 선택자: 띄어쓰기는 후손, >는 직계 자식 */
nav a { text-decoration: none; }   /* nav 안의 모든 a */
nav > a { color: #7c3aed; }        /* nav의 바로 아래 a */`,
          },
          {
            type: 'code',
            language: 'html',
            filename: 'index.html',
            code: `<head>
  <!-- 외부 스타일시트 연결 (권장 방법) -->
  <link rel="stylesheet" href="./style.css" />
</head>
<body>
  <nav id="header">
    <a class="card" href="#">링크</a>
  </nav>
</body>`,
          },
          {
            type: 'tip',
            title: '알아두면 좋아요',
            text: 'ID 선택자는 페이지에 하나뿐인 요소에만 쓸 수 있어서 재사용이 불가능합니다. 스타일에는 클래스 선택자를 기본으로 쓰고, ID는 JavaScript에서 요소를 찾는 용도나 앵커 이동 용도로 남겨두는 것이 실무의 일반적인 패턴입니다.',
          },
        ],
      },
      {
        id: 'css-2',
        title: '색상과 텍스트 스타일',
        duration: 20,
        summary: 'hex/rgb/hsl 색 표현법과 폰트 속성, 웹 폰트 적용 방법을 배웁니다.',
        content: [
          {
            type: 'paragraph',
            text: '웹에서 색은 세 가지 방식으로 표현할 수 있습니다. 16진수(hex)인 #7c3aed처럼 쓰는 방식이 가장 흔하고, rgb(124, 58, 237)처럼 빨강·초록·파랑 값으로 쓰는 RGB 방식, 마지막으로 hsl(262, 83%, 58%)처럼 색상·채도·명도로 쓰는 HSL 방식이 있어요. 같은 색을 표현하는 세 언어라고 생각하면 됩니다. 투명도가 필요하면 rgba()나 hsla(), 혹은 8자리 hex(#7c3aedcc)로 알파 값을 추가합니다.',
          },
          {
            type: 'paragraph',
            text: '텍스트 스타일의 핵심 속성은 font-size(크기), font-weight(굵기), line-height(줄 간격), text-align(정렬), letter-spacing(자간)입니다. 특히 line-height는 가독성을 좌우하는 중요한 속성으로, 본문은 보통 1.5~1.7 사이를 많이 사용해요. 단위 없이 쓰면 font-size의 몇 배인지를 의미합니다.',
          },
          {
            type: 'heading',
            text: '색상 표현 세 가지',
          },
          {
            type: 'code',
            language: 'css',
            filename: 'color.css',
            code: `.badge {
  /* 같은 보라색, 세 가지 표현 */
  color: #06b6d4;                    /* hex */
  background-color: rgb(6 182 212 / 0.1);  /* rgb + 투명도 */
  border: 1px solid hsl(188 86% 43%);      /* hsl */
}

/* 색상 팁: hover 등 상태에 어두운 명도를 주면 자연스러운 변화 */
.badge:hover {
  background-color: hsl(188 86% 43% / 0.2);
}`,
          },
          {
            type: 'heading',
            text: '본문 타이포그래피와 웹 폰트',
          },
          {
            type: 'code',
            language: 'css',
            filename: 'typography.css',
            code: `body {
  font-family: 'Pretendard Variable', Pretendard, -apple-system, sans-serif;
  font-size: 16px;      /* 본문 기본 크기 */
  line-height: 1.6;     /* 줄 간격 (배수) */
  letter-spacing: -0.01em; /* 한국어는 살짝 좁은 자간이 예뻐요 */
  color: #e6e9f0;
}

h2 {
  font-size: 1.5rem;    /* rem: 뿌리(html) 글자 크기에 대한 배수 */
  font-weight: 700;
  text-align: center;   /* 가로 정렬: left/center/right */
}

/* 웹 폰트는 CSS 맨 위 @import 또는 HTML <link>로 먼저 불러오기 */
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css');`,
          },
          {
            type: 'tip',
            title: '알아두면 좋아요',
            text: 'font-size에 px 대신 rem을 쓰면 사용자가 브라우저 기본 글자 크기를 키웠을 때 우리 사이트도 함께 커집니다. 접근성과 반응형 모두를 위해 rem 사용을 습관화하세요. line-height에는 px 같은 절대 단위보다 단위 없는 배수(1.6처럼)를 쓰는 것이 좋습니다.',
          },
        ],
      },
      {
        id: 'css-3',
        title: '박스 모델 완전 정복',
        duration: 25,
        summary: '콘텐츠·패딩·보더·마진의 관계와 box-sizing을 이해해 여백 계산을 마스터합니다.',
        content: [
          {
            type: 'paragraph',
            text: 'CSS에서 모든 요소는 사각형 상자로 취급됩니다. 이 상자는 안에서부터 콘텐츠(content), 패딩(padding), 보더(border), 마진(margin)의 네 겹으로 이루어져요. 요소가 화면에서 차지하는 실제 크기는 이 네 겹을 모두 더한 값이므로, "왜 내가 정한 width보다 크기가 커지지?" 하는 대부분의 레이아웃 고민이 박스 모델에서 비롯됩니다.',
          },
          {
            type: 'paragraph',
            text: '기본값인 box-sizing: content-box에서는 width가 "콘텐츠 영역"의 너비만을 가리킵니다. padding과 border를 추가하면 그만큼 박스가 커지죠. 반면 box-sizing: border-box에서는 width가 padding과 border까지 포함한 전체 너비가 됩니다. 머리로 계산한 대로 화면에 그대로 나오기 때문에, 실무에서는 border-box를 사실상 표준처럼 사용합니다.',
          },
          {
            type: 'heading',
            text: '네 겹의 상자 직접 보기',
          },
          {
            type: 'code',
            language: 'css',
            filename: 'box.css',
            code: `.card {
  width: 300px;           /* 콘텐츠 너비 (border-box 적용 시 전체 너비) */
  padding: 24px;          /* 콘텐츠와 보더 사이의 안쪽 여백 */
  border: 1px solid #2a3350;  /* 테두리 */
  margin: 16px auto;      /* 바깥 여백, auto는 가로 중앙 정렬 */
  border-radius: 16px;    /* 모서리 둥글게 */
}

/* 상하좌우를 각각 주고 싶다면 시계 방향으로 */
.notice {
  padding: 8px 16px 8px 16px;  /* 위 오른쪽 아래 왼쪽 */
  margin-top: 8px;
  margin-bottom: 8px;
}`,
          },
          {
            type: 'code',
            language: 'css',
            filename: 'global.css',
            code: `/* 실무 표준: 모든 요소에 border-box를 기본으로 */
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;  /* 브라우저 기본 여백 제거, 꼭 하는 초기화 */
}`,
          },
          {
            type: 'heading',
            text: 'margin-collapse(마진 병합) 알아보기',
          },
          {
            type: 'paragraph',
            text: '세로 방향의 마진은 특별한 규칙을 가집니다. 위 아래로 붙어 있는 두 요소의 margin이 서로 다른 크기라면, 둘이 더해지지 않고 큰 값 하나로 "병합"돼요. 이 현상을 margin collapse라고 합니다. 의도하지 않은 큰 빈틈이 생겼다면 마진 병합을 의심해 보세요. 병합을 피하고 싶다면 부모에 padding이나 border를 주거나, display: flex로 전환하면 됩니다.',
          },
          {
            type: 'tip',
            title: '알아두면 좋아요',
            text: 'margin은 양수뿐 아니라 음수도 쓸 수 있습니다. margin: -8px처럼 쓰면 요소를 당길 수 있어요. 또한 가로 중앙 정렬은 margin: 0 auto;가 고전적인 중앙 정렬 기법이지만, 부모에 display: flex를 쓰는 방법을 배우면 더 직관적으로 중앙 정렬을 할 수 있습니다.',
          },
        ],
      },
      {
        id: 'css-4',
        title: 'Flexbox로 레이아웃 잡기',
        duration: 25,
        summary: '플렉스 컨테이너와 아이템의 개념, 주축 정렬과 교차축 정렬을 배워 반응형 레이아웃을 만듭니다.',
        content: [
          {
            type: 'paragraph',
            text: 'Flexbox는 1차원(한 줄) 레이아웃을 잡는 가장 실용적인 도구입니다. 예전에는 float이나 position으로 어렵게 만들던 가운데 배치, 버튼 정렬, 카드 나열을 몇 줄로 끝낼 수 있어요. Flexbox의 세계에는 "컨테이너"와 "아이템" 두 역할이 있습니다. 부모 요소에 display: flex를 주면 그 순간 부모는 컨테이너가 되고, 자식들은 아이템이 됩니다.',
          },
          {
            type: 'paragraph',
            text: '컨테이너에 주는 대표 속성은 justify-content(주축 정렬), align-items(교차축 정렬), gap(아이템 사이 간격), flex-direction(주축 방향)입니다. "주축"은 아이템이 나열되는 방향으로, 기본값인 row에서는 가로 방향이고, column으로 바꾸면 세로 방향이 돼요. justify-content: center와 align-items: center를 함께 쓰면 자식을 부모의 정중앙에 올려놓는 완벽한 중앙 정렬이 완성됩니다.',
          },
          {
            type: 'heading',
            text: '기본 플렉스 레이아웃',
          },
          {
            type: 'code',
            language: 'css',
            filename: 'flex.css',
            code: `.navbar {
  display: flex;
  justify-content: space-between; /* 양 끝으로 밀어붙이기 */
  align-items: center;            /* 세로 중앙 정렬 */
  padding: 0 24px;
}

.menu {
  display: flex;
  gap: 16px;             /* 아이템 사이 간격 (margin 대신) */
  list-style: none;      /* li의 점 제거 */
  padding: 0;
}`,
          },
          {
            type: 'code',
            language: 'html',
            filename: 'navbar.html',
            code: `<nav class="navbar">
  <strong>CodeLab</strong>
  <ul class="menu">
    <li>커리큘럼</li>
    <li>플레이그라운드</li>
    <li>퀴즈</li>
  </ul>
</nav>`,
          },
          {
            type: 'heading',
            text: '유연한 카드 레이아웃',
          },
          {
            type: 'code',
            language: 'css',
            filename: 'cards.css',
            code: `.card-list {
  display: flex;
  flex-wrap: wrap;       /* 자리가 부족하면 다음 줄로 넘기기 */
  gap: 24px;
}

.card {
  flex: 1 1 240px; /* 늘이기:줄이기 기본너비 — 240px 기준으로 유연하게 */
  padding: 24px;
  border-radius: 16px;
  background: #141a2b;
}`,
          },
          {
            type: 'tip',
            title: '알아두면 좋아요',
            text: 'flex: 1 1 240px은 "기본 240px에서 시작해, 남은 공간을 나눠 가지고, 부족하면 줄어든다"는 뜻의 축약형입니다. 세 값은 늘이기(flex-grow), 줄이기(flex-shrink), 기본 크기(flex-basis) 순입니다. 이 한 줄이면 미디어 쿼리 없이도 유연한 반응형 카드 그리드를 만들 수 있어요.',
          },
        ],
      },
    ],
  },
  {
    id: 'js',
    number: 3,
    title: 'JavaScript — 웹에 생명을 불어넣기',
    shortTitle: 'JavaScript',
    description:
      '콘솔 출력, 변수와 자료형, 함수와 조건·반복문, 그리고 DOM 조작과 이벤트까지. 웹페이지를 움직이게 만드는 JavaScript 기초를 배웁니다.',
    lessons: [
      {
        id: 'js-1',
        title: '자바스크립트 첫걸음과 콘솔',
        duration: 20,
        summary: '자바스크립트가 하는 일을 알고, script 태그로 코드를 불러오며 콘솔로 출력해 봅니다.',
        content: [
          {
            type: 'paragraph',
            text: '자바스크립트는 웹페이지에 동작을 부여하는 프로그래밍 언어입니다. 버튼을 눌렀을 때 반응하게 만들고, 입력값을 검증하고, 화면의 내용을 바꾸는 일을 모두 자바스크립트가 해요. HTML이 골격, CSS가 외모라면 자바스크립트는 웹의 근육과 신경계라고 할 수 있습니다. 별도의 컴파일 없이 브라우저가 바로 실행하는 "인터프리터 언어"입니다.',
          },
          {
            type: 'paragraph',
            text: '자바스크립트 코드를 HTML에 넣는 방법은 <script> 태그를 쓰는 것입니다. head 안에 직접 쓸 수도 있지만, 보통은 별도의 .js 파일로 만들어 <script src="main.js"></script>처럼 연결해요. 이때 defer 속성을 붙이면 HTML 파싱이 끝난 뒤에 스크립트가 실행되므로, 화면의 요소를 안전하게 다룰 수 있습니다.',
          },
          {
            type: 'heading',
            text: '첫 자바스크립트 실행',
          },
          {
            type: 'code',
            language: 'js',
            filename: 'main.js',
            code: `// 콘솔에 출력하기 (개발자 도구 F12 → Console 탭에서 확인)
console.log('안녕하세요, CodeLab!');

// 문자열과 숫자를 같이 출력할 때는 쉼표로 연결
console.log('1 + 1 =', 1 + 1);

// 경고와 에러도 출력할 수 있음 (색상이 다르게 표시됨)
console.warn('주의가 필요합니다');
console.error('무언가 잘못되었습니다');`,
          },
          {
            type: 'code',
            language: 'html',
            filename: 'index.html',
            code: `<head>
  <!-- defer: HTML 로딩이 끝난 뒤 스크립트 실행 (안전!) -->
  <script src="./main.js" defer></script>
</head>
<body>
  <h1>콘솔을 열어 보세요 (F12)</h1>
</body>`,
          },
          {
            type: 'heading',
            text: '주석과 세미콜론',
          },
          {
            type: 'paragraph',
            text: '//는 한 줄 주석, /* */는 여러 줄 주석입니다. 주석은 실행되지 않고 코드를 설명하는 메모예요. 자바스크립트에서는 문장 끝의 세미콜론(;)을 생략할 수도 있지만, 어디서 문장이 끝나는지 명확히 하기 위해 붙이는 것을 추천합니다.',
          },
          {
            type: 'tip',
            title: '알아두면 좋아요',
            text: 'console.log는 개발 중 값을 확인하는 가장 기본적인 도구지만, 배포할 때는 필요 없는 로그를 지우거나 비활성화하는 것이 좋습니다. 디버깅이 필요하면 console.log보다 debugger; 문이나 브라우저의 중단점(breakpoint) 기능을 활용해 보세요.',
          },
        ],
      },
      {
        id: 'js-2',
        title: '변수와 자료형',
        duration: 25,
        summary: 'let/const로 변수를 선언하고, 문자·숫자·불리언·배열·객체 등 주요 자료형을 배웁니다.',
        content: [
          {
            type: 'paragraph',
            text: '변수는 값을 담는 이름표가 있는 상자입니다. 자바스크립트에서 변수는 let(변경 가능)과 const(상수, 변경 불가) 두 가지로 선언해요. 예전에 쓰이던 var는 스코프(유효 범위) 규칙이 혼란스러워 최신 코드에서는 거의 쓰이지 않습니다. 기본은 const로 선언하고, 값이 바뀌어야 할 때만 let을 쓰는 것이 좋은 습관입니다.',
          },
          {
            type: 'paragraph',
            text: '자바스크립트의 주요 자료형은 문자열(string), 숫자(number), 불리언(boolean), null(의도적인 빈 값), undefined(아직 값이 없음)입니다. 그리고 여러 값을 묶는 배열(array)과 키-값 쌍의 객체(object)가 있어요. 자바스크립트는 동적 타입 언어라서 변수에 어떤 자료형이든 담을 수 있고, typeof 연산자로 자료형을 확인할 수 있습니다.',
          },
          {
            type: 'heading',
            text: 'let과 const로 선언하기',
          },
          {
            type: 'code',
            language: 'js',
            filename: 'variables.js',
            code: `const siteName = 'CodeLab';  // 상수: 재할당 불가
let visitCount = 0;          // 변수: 값을 바꿀 수 있음
visitCount = visitCount + 1; // 1이 됨

console.log(siteName);   // 'CodeLab'
console.log(visitCount); // 1
console.log(typeof siteName); // 'string'

// const여도 객체나 배열의 "내용"은 바꿀 수 있음 (재할당만 불가)
const user = { name: '김코드' };
user.name = '이프론트'; // 가능!`,
          },
          {
            type: 'heading',
            text: '배열과 객체',
          },
          {
            type: 'code',
            language: 'js',
            filename: 'data.js',
            code: `// 배열: 순서가 있는 목록, 인덱스는 0부터 시작
const chapters = ['HTML', 'CSS', 'JavaScript'];
console.log(chapters[0]); // 'HTML' (첫 번째)
console.log(chapters.length); // 3 (개수)

// 객체: 이름표가 붙은 값들의 모음
const lecture = {
  id: 'js-2',
  title: '변수와 자료형',
  duration: 25,
};

console.log(lecture.title);   // 점 표기법
console.log(lecture['id']);   // 대괄호 표기법

// 배열 안에 객체, 객체 안에 배열 — 자유롭게 조합
const course = { chapters: [{ title: 'HTML' }] };`,
          },
          {
            type: 'tip',
            title: '알아두면 좋아요',
            text: '자바스크립트에서 ==(느슨한 비교)는 자료형을 강제로 맞춘 뒤 비교해서 의외의 결과가 나올 수 있습니다. 예를 들어 0 == \'\'은 true예요. 그래서 값과 자료형이 모두 같은지 비교하는 ===(엄격한 비교)를 기본으로 쓰는 것이 실무 규칙입니다.',
          },
        ],
      },
      {
        id: 'js-3',
        title: '함수와 조건·반복문',
        duration: 30,
        summary: '함수를 정의하고 호출하는 법, if 조건문과 for 반복문으로 흐름을 제어합니다.',
        content: [
          {
            type: 'paragraph',
            text: '함수는 "재사용 가능한 코드 조각"입니다. 입력(매개변수)을 받아서 처리한 뒤 결과를 반환(return)해요. 자바스크립트에는 function 키워드로 선언하는 "함수 선언문"과, 변수에 담는 "함수 표현식"이 있습니다. 이름이 없는 함수를 화살표 함수(=>)로 짧게 쓰는 방법도 흔히 쓰입니다.',
          },
          {
            type: 'paragraph',
            text: '조건문은 "상황에 따라 다른 동작"을 하게 하고, 반복문은 "같은 일을 여러 번" 하게 합니다. if문은 조건이 true일 때만 코드 블록을 실행하며, for문은 횟수를 정해 반복합니다. 프로그래밍의 흐름 제어는 결국 이 두 가지가 핵심이에요.',
          },
          {
            type: 'heading',
            text: '함수 만들기와 호출하기',
          },
          {
            type: 'code',
            language: 'js',
            filename: 'function.js',
            code: `// 함수 선언문: 이름이 있는 함수
function greet(name) {
  return '안녕하세요, ' + name + '님!';
}

// 화살표 함수: 같은 기능을 더 짧게 (최신 문법)
const greetArrow = (name) => \`안녕하세요, \${name}님!\`;  // 템플릿 리터럴

console.log(greet('코드랩'));
console.log(greetArrow('코드랩'));

// 매개변수에 기본값을 미리 지정할 수도 있음
function showBadge(score = 0) {
  return '점수: ' + score + '점';
}`,
          },
          {
            type: 'heading',
            text: '조건문과 반복문',
          },
          {
            type: 'code',
            language: 'js',
            filename: 'control.js',
            code: `// 조건문: 점수에 따라 다른 메시지
function getGrade(score) {
  if (score >= 90) {
    return 'A';
  } else if (score >= 80) {
    return 'B';
  } else {
    return 'C';
  }
}

// 반복문: 1부터 5까지 출력
for (let i = 1; i <= 5; i++) {
  console.log(i + '번째 인사');
}

// 배열은 for...of로 돌리는 게 가장 깔끔
const chapters = ['HTML', 'CSS', 'JavaScript'];
for (const chapter of chapters) {
  console.log(chapter + ' 챕터를 공부합니다');
}`,
          },
          {
            type: 'tip',
            title: '알아두면 좋아요',
            text: '함수는 "한 가지 일만 하게" 작게 만드는 것이 좋습니다. return은 함수를 즉시 종료하므로, 깊은 중첩 대신 "불필요한 경우를 먼저 return으로 걸러내는" 방식(조기 반환)을 쓰면 읽기 쉬운 코드가 됩니다.',
          },
        ],
      },
      {
        id: 'js-4',
        title: 'DOM 조작과 이벤트',
        duration: 30,
        summary: 'DOM을 이해하고 querySelector로 요소를 선택해, 클릭 카운터를 직접 만들어 봅니다.',
        content: [
          {
            type: 'paragraph',
            text: 'DOM(Document Object Model)은 HTML 문서를 브라우저가 객체 트리로 해석한 것입니다. 자바스크립트는 이 트리를 통해 화면의 요소를 읽고, 바꾸고, 지울 수 있어요. document.querySelector(\'선택자\')는 CSS 선택자(.\'클래스\'나 \'#id\')로 요소 하나를 찾는 가장 대표적인 방법입니다.',
          },
          {
            type: 'paragraph',
            text: '이벤트는 클릭, 입력, 키보드 눌림 같은 사용자의 행동입니다. 요소에 addEventListener(\'click\', 함수)를 붙이면, 해당 이벤트가 발생했을 때 우리가 만든 함수가 실행됩니다. "상태(변수)를 바꾸고, 화면에 반영한다"는 흐름만 익히면 대부분의 인터랙티브 기능이 이 패턴으로 만들어진다는 것을 알게 될 거예요.',
          },
          {
            type: 'heading',
            text: '실습: 클릭 카운터 버튼',
          },
          {
            type: 'code',
            language: 'html',
            filename: 'counter.html',
            code: `<body>
  <h1>클릭 카운터</h1>
  <p>지금까지 <strong id="count">0</strong>번 클릭했습니다.</p>
  <button id="count-btn">클릭하기</button>

  <script src="./counter.js" defer></script>
</body>`,
          },
          {
            type: 'code',
            language: 'js',
            filename: 'counter.js',
            code: `// 1. 화면의 요소를 선택
const countEl = document.querySelector('#count');
const button = document.querySelector('#count-btn');

// 2. 상태(데이터)를 변수로 관리
let count = 0;

// 3. 클릭 이벤트가 오면: 상태를 바꾸고 → 화면에 반영
button.addEventListener('click', () => {
  count = count + 1;               // 상태 업데이트
  countEl.textContent = count;     // 화면에 반영
  console.log('현재 카운트:', count);
});`,
          },
          {
            type: 'heading',
            text: '더 다양한 DOM 조작',
          },
          {
            type: 'code',
            language: 'js',
            filename: 'dom.js',
            code: `const box = document.querySelector('.box');

box.textContent = '새로운 글자';  // 글자만 바꾸기 (안전)
box.classList.add('highlight');   // 클래스 추가/제거로 스타일 제어
box.style.color = '#06b6d4';      // 인라인 스타일 직접 변경
box.setAttribute('title', '팁');  // 속성 바꾸기

// 여러 개의 요소를 한 번에 선택
document.querySelectorAll('.menu li').forEach((item) => {
  console.log(item.textContent);
});`,
          },
          {
            type: 'tip',
            title: '알아두면 좋아요',
            text: 'textContent는 순수 텍스트만 다루지만 innerHTML은 HTML 태그를 해석합니다. 사용자가 입력한 값을 innerHTML로 직접 넣으면 악성 스크립트가 실행되는 XSS 공격에 취약해질 수 있어요. 되도록 textContent를 쓰고, innerHTML은 신뢰할 수 있는 정적 마크업에만 사용하세요.',
          },
        ],
      },
    ],
  },
  {
    id: 'node',
    number: 4,
    title: 'Node.js & Express — 백엔드 입문',
    shortTitle: 'Node.js',
    description:
      '프론트엔드가 끝났다면 이제 서버 차례입니다. JavaScript 그대로 백엔드를 만들 수 있는 Node.js와 Express로, 데이터를 주고받는 서버를 직접 만들어 봅니다.',
    lessons: [
      {
        id: 'node-1',
        title: '백엔드란? Node.js 시작하기',
        duration: 20,
        summary:
          '프론트엔드와 백엔드의 역할을 구분하고, Node.js를 설치해 첫 스크립트를 실행해 봅니다.',
        content: [
          {
            type: 'paragraph',
            text: '지금까지 만든 웹페이지는 브라우저 안에서만 동작했어요. 화면을 누구에게 보여줄지, 회원가입 정볘이나 게시글을 어디에 저장할지는 프론트엔드만으로는 해결할 수 없습니다. 이런 일을 담당하는 것이 "백엔드(서버)"예요. 프론트엔드가 손님을 맞이하는 홀 직원이라면, 백엔드는 주방에서 재료를 꺼내 요리하는 공간이라고 할 수 있어요.',
          },
          {
            type: 'paragraph',
            text: '클라이언트(프론트엔드)와 서버(백엔드)는 HTTP라는 약속으로 대화합니다. 브라우저가 서버에 "이 데이터 달라"고 요청(Request)하면, 서버는 처리하고 응답(Response)으로 보내 주는 식이죠. 우리가 매일 쓰는 로그인, 검색, 좋아요 버튼도 전부 이 요청-응답이 반복되는 결과물입니다.',
          },
          {
            type: 'heading',
            text: 'Node.js란?',
          },
          {
            type: 'paragraph',
            text: '원래 JavaScript는 브라우저 안에서만 실행되는 언어였습니다. Node.js는 구글의 V8 엔진을 이용해 JavaScript를 브라우저 밖, 즉 우리 컴퓨터나 서버에서도 실행할 수 있게 해주는 "실행 환경(런타임)"이에요. 덕분에 지금까지 배운 JavaScript 문법을 그대로 이어서 서버를 만들 수 있습니다. 언어를 새로 배울 필요가 없다는 점이 Node.js의 가장 큰 매력이에요.',
          },
          {
            type: 'heading',
            text: '설치와 확인',
          },
          {
            type: 'paragraph',
            text: 'nodejs.org에 접속해서 LTS(장기 지원) 버전을 설치하세요. 설치가 끝났다면 터미널에서 버전을 확인해 봅니다. node와 함께 npm(Node Package Manager)도 같이 설치되는데, npm은 다른 개발자들이 만든 패키지(라이브러리)를 내려받는 도구예요.',
          },
          {
            type: 'code',
            language: 'bash',
            filename: '터미널',
            code: `# 설치 확인 (버전 번호가 출력되면 OK)
node -v
npm -v`,
          },
          {
            type: 'heading',
            text: '첫 번째 스크립트 실행하기',
          },
          {
            type: 'paragraph',
            text: '작업 폴더를 만들고 hello.js 파일을 작성해 봅시다. 터미널에서 node 명령 뒤에 파일 이름을 적으면 JavaScript 파일을 실행할 수 있어요.',
          },
          {
            type: 'code',
            language: 'javascript',
            filename: 'hello.js',
            code: `// hello.js — Node.js에서 실행하는 첫 스크립트
const name = 'CodeLab';

console.log('안녕하세요, ' + name + ' 백엔드!');
// 터미널 출력: 안녕하세요, CodeLab 백엔드!`,
          },
          {
            type: 'code',
            language: 'bash',
            filename: '터미널',
            code: `node hello.js`,
          },
          {
            type: 'tip',
            title: '알아두면 좋아요',
            text: 'Node.js는 버전이 자주 올라갑니다. 강의와 같은 환경을 만들려면 LTS 버전을 설치하세요. VS Code 내장 터미널에서 바로 node 명령을 써볼 수 있고, Mac은 Homebrew(brew install node), Windows는 공식 설치 프로그램을 사용하면 됩니다.',
          },
        ],
      },
      {
        id: 'node-2',
        title: 'Express로 웹 서버 만들기',
        duration: 25,
        summary:
          'npm으로 Express를 설치하고, 라우팅과 경로 파라미터로 요청을 처리하는 서버를 만듭니다.',
        content: [
          {
            type: 'paragraph',
            text: 'Node.js만으로도 서버를 만들 수 있지만 코드가 복잡하고 불편합니다. 실제로는 대부분 "Express"라는 프레임워크를 함께 사용해요. Express는 경로 처리, 요청·응답 관리 같은 웹 서버의 필수 기능을 아주 간단한 코드로 만들 수 있게 도와주는 도구입니다. npm으로 설치해서 바로 쓸 수 있어요.',
          },
          {
            type: 'code',
            language: 'bash',
            filename: '터미널',
            code: `# 프로젝트 폴더에서 npm 초기화 (package.json 생성)
npm init -y

# express 설치
npm install express`,
          },
          {
            type: 'paragraph',
            text: 'npm install을 실행하면 node_modules 폴더에 express가 내려오고, package.json에 설치 기록이 남습니다. package.json은 이 프로젝트가 어떤 패키지들을 사용하는지 적어둔 명단이라고 생각하세요. node_modules는 용량이 커서 보통 git에 올리지 않고, 다른 사람은 package.json만 보고 npm install로 같은 환경을 다시 만들어요.',
          },
          {
            type: 'heading',
            text: '기본 서버 코드',
          },
          {
            type: 'code',
            language: 'javascript',
            filename: 'server.js',
            code: `// server.js — Express 웹 서버의 기본 뼈대
const express = require('express');

const app = express(); // express 앱 생성

// GET 요청이 / 경로로 오면 환영 문구 응답
app.get('/', (req, res) => {
  res.send('안녕하세요, Express 서버입니다!');
});

// 3000 포트에서 서버 실행
app.listen(3000, () => {
  console.log('서버가 http://localhost:3000 에서 실행 중이에요');
});`,
          },
          {
            type: 'paragraph',
            text: 'app.get의 첫 번째 인자는 "경로(path)"예요. 브라우저에서 http://localhost:3000/ 으로 접속하면 / 경로에 해당하는 콜백 함수가 실행됩니다. 콜백은 req(요청 정보)와 res(응답 도구)를 받아서, res.send()로 보낼 내용을 정해요. 이처럼 "어떤 경로로 어떤 요청이 오면 무엇을 돌려줄지"를 정하는 것을 라우팅(Routing)이라고 합니다.',
          },
          {
            type: 'heading',
            text: '경로 파라미터와 쿼리: 주소로 값 받기',
          },
          {
            type: 'paragraph',
            text: '주소 안에 값을 담아 서버에 전달할 수도 있습니다. 경로에 : 뒤에 이름을 붙이면 실제 주소의 그 부분이 변수처럼 들어오고, 물음표 뒤의 쿼리 문자열은 req.query로 읽을 수 있어요.',
          },
          {
            type: 'code',
            language: 'javascript',
            filename: 'routes.js',
            code: `// /users/7 접속 → req.params.id 가 '7'이 됨
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(userId + '번 사용자의 프로필입니다.');
});

// /search?q=강의 접속 → req.query.q 가 '강의'가 됨
app.get('/search', (req, res) => {
  res.send('검색어: ' + req.query.q);
});`,
          },
          {
            type: 'tip',
            title: '알아두면 좋아요',
            text: '서버를 실행한 채로 코드를 고치면, 저장 후 서버를 재시작해야 반영됩니다. 매번 껐다 켜기 귀찮다면 npm install -D nodemon 후 npx nodemon server.js로 실행해 보세요. 파일이 바뀔 때마다 서버가 알아서 재시작됩니다.',
          },
        ],
      },
      {
        id: 'node-3',
        title: 'REST API와 JSON',
        duration: 25,
        summary:
          'JSON 형식을 익히고 REST 설계 약속에 따라 GET·POST API를 만들어 봅니다.',
        content: [
          {
            type: 'paragraph',
            text: '프론트엔드와 백엔드가 데이터를 주고받을 때는 주로 JSON(JavaScript Object Notation) 형식을 사용합니다. JSON은 JavaScript의 객체 표기법에서 따온 텍스트 형식으로, 키와 값으로 이루어져 사람도 읽기 쉬워요. 파일 확장자 .json이나 API 응답 본문에서 흔히 볼 수 있습니다.',
          },
          {
            type: 'code',
            language: 'json',
            filename: 'post.json',
            code: `{
  "id": 1,
  "title": "첫 게시글",
  "author": "코드랩",
  "likes": 42
}`,
          },
          {
            type: 'heading',
            text: 'REST API란?',
          },
          {
            type: 'paragraph',
            text: 'REST API는 "자원을 URL로 표현하고, HTTP 메서드로 행동을 표현하는" 설계 약속이에요. 게시글 목록 달라는 요청은 GET /posts, 새 글 올리기는 POST /posts처럼 정합니다. 약속대로 만들면 프론트엔드 개발자가 서버 설계서를 보지 않고도 어떻게 쓸지 짐작할 수 있어서 협업에 아주 유리해요.',
          },
          {
            type: 'heading',
            text: '게시글 API 만들기',
          },
          {
            type: 'paragraph',
            text: 'Express에서 JSON 응답은 res.json()으로 보냅니다. POST 요청의 본문(body)은 express.json() 미들웨어를 먼저 적용해야 읽을 수 있어요. 미들웨어는 "요청이 라우트에 도착하기 전에 거쳐가는 처리 단계"라고 생각하세요.',
          },
          {
            type: 'code',
            language: 'javascript',
            filename: 'posts-api.js',
            code: `// posts-api.js — 메모리에 저장하는 미니 게시판 API
const express = require('express');
const app = express();

// 요청 본문(JSON)을 해석해서 req.body에 담아줌
app.use(express.json());

let posts = [
  { id: 1, title: '첫 게시글' },
  { id: 2, title: 'Node.js 재미있어요' },
];

// GET /posts — 게시글 목록 조회
app.get('/posts', (req, res) => {
  res.json(posts); // JSON으로 응답
});

// POST /posts — 새 게시글 작성
app.post('/posts', (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title, // 클라이언트가 보내 온 본문
  };
  posts.push(newPost);
  res.status(201).json(newPost); // 201 Created
});

app.listen(3000);`,
          },
          {
            type: 'paragraph',
            text: '상태 코드는 요청 결과를 나타내는 숫자입니다. 200은 성공, 201은 새로 만듦, 404는 찾을 수 없음, 500은 서버 오류를 의미해요. res.status()로 코드를 바꿔 보내면, 프론트엔드에서 "성공인지 실패인지"를 숫자로 구분해 처리할 수 있습니다.',
          },
          {
            type: 'code',
            language: 'bash',
            filename: '터미널',
            code: `# 목록 조회
curl http://localhost:3000/posts

# 새 글 작성 (POST + JSON 본문)
curl -X POST http://localhost:3000/posts \\
  -H "Content-Type: application/json" \\
  -d '{"title": "curl로 작성한 글"}'`,
          },
          {
            type: 'tip',
            title: '알아두면 좋아요',
            text: '브라우저 주소창은 GET 요청만 보낼 수 있어서 POST를 테스트하려면 curl이나 Postman 같은 도구가 필요합니다. Postman은 버튼 클릭으로 메서드와 본문을 정해 요청을 보내고 응답을 예쁘게 보여줘서, API를 만들 때 사실상 표준 도구처럼 쓰여요.',
          },
        ],
      },
      {
        id: 'node-4',
        title: '프론트엔드와 백엔드 연결하기',
        duration: 25,
        summary:
          'fetch()로 우리가 만든 API를 호출하고, CORS와 정적 파일 서빙까지 배웁니다.',
        content: [
          {
            type: 'paragraph',
            text: '서버도 있고 프론트엔드도 있다면, 마지막으로 둘을 연결할 차례입니다. 브라우저의 JavaScript에서 서버로 요청을 보내는 표준 방법이 fetch() 함수예요. 3챕터에서 배운 DOM 조작과 결합하면, 서버에서 받아온 데이터를 화면에 직접 그릴 수 있습니다.',
          },
          {
            type: 'heading',
            text: 'fetch로 데이터 가져오기',
          },
          {
            type: 'code',
            language: 'javascript',
            filename: 'app.js',
            code: `// app.js — 서버에서 게시글을 받아와 화면에 보여주기
async function loadPosts() {
  // GET /posts 요청 → JSON 응답을 해석
  const response = await fetch('http://localhost:3000/posts');
  const posts = await response.json();

  const list = document.querySelector('#post-list');
  posts.forEach((post) => {
    const li = document.createElement('li');
    li.textContent = post.title;
    list.appendChild(li);
  });
}

loadPosts();`,
          },
          {
            type: 'paragraph',
            text: 'fetch는 "비동기"로 동작합니다. 서버에서 답이 올 때까지 화면이 멈추지 않고, 답이 오면 이어서 처리해요. 그래서 await(기다려!) 키워드를 써서 응답이 도착할 때까지 다음 줄로 넘어가지 않게 만드는 겁니다.',
          },
          {
            type: 'heading',
            text: 'CORS 오류를 만났다면',
          },
          {
            type: 'paragraph',
            text: 'localhost:5500(프론트)에서 localhost:3000(백엔드)으로 요청하면 브라우저가 "다른 출처(origin)네?"라며 요청을 막는 경우가 있습니다. 이것이 CORS(Cross-Origin Resource Sharing) 정책이에요. 개발 중에는 cors 패키지로 백엔드 쪽에서 허용해 주는 것이 일반적입니다.',
          },
          {
            type: 'code',
            language: 'javascript',
            filename: 'server.js',
            code: `// 서버 측 — 다른 출처의 요청을 허용
const cors = require('cors');
app.use(cors());`,
          },
          {
            type: 'heading',
            text: '백엔드에서 프론트엔드 파일까지 서빙하기',
          },
          {
            type: 'paragraph',
            text: '배포할 때는 보통 백엔드가 프론트엔드의 HTML·CSS·JS 파일까지 직접 보내 주는 방식을 많이 씁니다. express.static() 미들웨어 하나면 "public 폴더의 파일을 그대로 주소로 접근 가능하게" 만들 수 있어요.',
          },
          {
            type: 'code',
            language: 'javascript',
            filename: 'server.js',
            code: `// public 폴더 안의 파일을 자동으로 제공
app.use(express.static('public'));
// → http://localhost:3000/index.html 로 접속 가능`,
          },
          {
            type: 'tip',
            title: '알아두면 좋아요',
            text: '로컬에서는 잘 되던 API가 배포 후엔 주소가 달라지는 일이 흔합니다. fetch 주소에 http://localhost:3000 같은 로컬 주소를 직접 박지 말고, 같은 도메인이라면 상대 경로(/posts)로 쓰는 습관을 들이세요. 그래야 배포 때 코드를 고치지 않아도 됩니다.',
          },
        ],
      },
    ],
  },
]

// --- 편의 헬퍼 ---

export const allLessons = chapters.flatMap((chapter) =>
  chapter.lessons.map((lesson) => ({
    ...lesson,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    chapterNumber: chapter.number,
  })),
)

export function getChapterById(chapterId) {
  return chapters.find((chapter) => chapter.id === chapterId)
}

export function getLessonById(lessonId) {
  return allLessons.find((lesson) => lesson.id === lessonId) || null
}

export function getAdjacentLessons(lessonId) {
  const index = allLessons.findIndex((lesson) => lesson.id === lessonId)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? allLessons[index - 1] : null,
    next: index < allLessons.length - 1 ? allLessons[index + 1] : null,
  }
}

export const totalLessonCount = allLessons.length
