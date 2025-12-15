// --- 1. 데이터 베이스 (DB 역할) ---
// Scale: D Kurd (D3 Ding + 8 notes)
// A3, Bb3, C4, D4, E4, F4, G4, A4
const scaleNotes = ['A3', 'Bb3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4'];
const dingNote = 'D3';

// [기능 1] 추천 화음 진행 (Chord Progressions) - Malte Marten Style Best 20
const chordProgressions = [
    { name: "1. Inner Peace (내면의 평화)", sequence: [[0, 2, 4], [1, 3, 5], [0, 2, 4], [3, 5, 7]] },
    { name: "2. River Flow (강물의 흐름)", sequence: [[0, 1, 3], [2, 4, 6], [3, 5, 7], [1, 3, 5]] },
    { name: "3. Morning Mist (아침 안개)", sequence: [[0, 4, 7], [1, 5, 2], [3, 6, 1], [0, 4, 7]] },
    { name: "4. Starry Night (별이 빛나는 밤)", sequence: [[3, 5, 7], [2, 4, 6], [1, 3, 5], [0, 2, 4]] },
    { name: "5. Gentle Breeze (산들바람)", sequence: [[0, 2, 5], [1, 3, 6], [2, 4, 7], [3, 5, 1]] },
    { name: "6. Deep Ocean (깊은 바다)", sequence: [[0, 1, 4], [2, 5, 7], [0, 3, 6], [1, 4, 7]] },
    { name: "7. Forest Rain (숲속의 비)", sequence: [[4, 6, 1], [3, 5, 0], [2, 4, 7], [1, 3, 6]] },
    { name: "8. Sunset Glow (노을)", sequence: [[0, 2, 4], [3, 5, 7], [1, 3, 6], [2, 4, 0]] },
    { name: "9. Moon Dance (달의 춤)", sequence: [[1, 4, 7], [0, 3, 6], [2, 5, 1], [3, 6, 0]] },
    { name: "10. Awakening (깨어남)", sequence: [[0, 3, 5], [1, 4, 6], [2, 5, 7], [0, 3, 5]] },
    { name: "11. Serenity (고요함)", sequence: [[0, 4, 1], [2, 5, 3], [4, 7, 0], [1, 3, 6]] },
    { name: "12. Golden Hour (황금 시간)", sequence: [[3, 6, 1], [2, 5, 0], [1, 4, 7], [0, 3, 6]] },
    { name: "13. Floating Clouds (떠디는 구름)", sequence: [[0, 2, 4], [4, 6, 1], [1, 3, 5], [5, 7, 2]] },
    { name: "14. Heartbeat (심장 박동)", sequence: [[0, 0, 4], [1, 1, 5], [3, 3, 7], [0, 0, 4]] },
    { name: "15. Cosmic Dust (우주 먼지)", sequence: [[2, 5, 7], [1, 4, 6], [0, 3, 5], [2, 4, 7]] },
    { name: "16. Spring Blossom (봄의 꽃)", sequence: [[0, 1, 2], [3, 4, 5], [6, 7, 0], [1, 3, 5]] },
    { name: "17. Autumn Leaves (가을 낙엽)", sequence: [[7, 5, 3], [6, 4, 2], [5, 3, 1], [4, 2, 0]] },
    { name: "18. Winter Silence (겨울 침묵)", sequence: [[0, 4, 7], [0, 3, 7], [0, 2, 7], [0, 4, 7]] },
    { name: "19. Spirit Call (영혼의 부름)", sequence: [[1, 5, 2], [3, 7, 4], [0, 4, 1], [2, 6, 3]] },
    { name: "20. Eternal Loop (영원한 고리)", sequence: [[0, 2, 4], [1, 3, 5], [2, 4, 6], [3, 5, 7]] }
];

// [기능 2] 명상 패턴 데이터 - Malte Marten Style Best 20
// noteIdx: 0~7 (Scale), 'ding' (Center)
// time: 박자 (순서 및 간격, baseTime * time 로 계산)
const patterns = {
    'p1': {
        name: "1. Morning Light (아침 햇살)", sequence: [
            { idx: 'ding', t: 0 }, { idx: 0, t: 1 }, { idx: 2, t: 2 }, { idx: 4, t: 3 }, { idx: 'ding', t: 4 }, { idx: 7, t: 5 }, { idx: 4, t: 6 }, { idx: 2, t: 7 }
        ]
    },
    'p2': {
        name: "2. River Flow (강물의 흐름)", sequence: [
            { idx: 0, t: 0 }, { idx: 2, t: 0.5 }, { idx: 4, t: 1 }, { idx: 7, t: 1.5 }, { idx: 6, t: 2 }, { idx: 4, t: 2.5 }, { idx: 2, t: 3 }, { idx: 0, t: 3.5 }
        ]
    },
    'p3': {
        name: "3. Inner Call (내면의 부름)", sequence: [
            { idx: 'ding', t: 0 }, { idx: 0, t: 0.5 }, { idx: 1, t: 1 }, { idx: 0, t: 1.5 }, { idx: 'ding', t: 2 }, { idx: 4, t: 2.5 }, { idx: 5, t: 3 }, { idx: 4, t: 3.5 }
        ]
    },
    'p4': {
        name: "4. Gentle Rain (부드러운 비)", sequence: [
            { idx: 7, t: 0 }, { idx: 4, t: 0.5 }, { idx: 2, t: 1 }, { idx: 0, t: 1.5 }, { idx: 1, t: 2 }, { idx: 3, t: 2.5 }, { idx: 5, t: 3 }, { idx: 7, t: 3.5 }
        ]
    },
    'p5': {
        name: "5. Sunrise (일출)", sequence: [
            { idx: 'ding', t: 0 }, { idx: 0, t: 1 }, { idx: 1, t: 2 }, { idx: 2, t: 3 }, { idx: 3, t: 4 }, { idx: 4, t: 5 }, { idx: 5, t: 6 }, { idx: 7, t: 7 }
        ]
    },
    'p6': {
        name: "6. Golden Hour (황금 시간)", sequence: [
            { idx: 3, t: 0 }, { idx: 6, t: 0.5 }, { idx: 1, t: 1 }, { idx: 'ding', t: 1.5 }, { idx: 1, t: 2 }, { idx: 6, t: 2.5 }, { idx: 3, t: 3 }, { idx: 'ding', t: 3.5 }
        ]
    },
    'p7': {
        name: "7. Deep Breath (깊은 호흡)", sequence: [
            { idx: 0, t: 0 }, { idx: 4, t: 2 }, { idx: 7, t: 4 }, { idx: 4, t: 6 }, { idx: 0, t: 8 }, { idx: 'ding', t: 10 }
        ]
    },
    'p8': {
        name: "8. Starry Night (별밤)", sequence: [
            { idx: 'ding', t: 0 }, { idx: 7, t: 0.5 }, { idx: 6, t: 1 }, { idx: 5, t: 1.5 }, { idx: 4, t: 2 }, { idx: 5, t: 2.5 }, { idx: 6, t: 3 }, { idx: 7, t: 3.5 }
        ]
    },
    'p9': {
        name: "9. Wind Chime (풍경 소리)", sequence: [
            { idx: 7, t: 0 }, { idx: 6, t: 0.25 }, { idx: 7, t: 0.5 }, { idx: 5, t: 1 }, { idx: 3, t: 1.5 }, { idx: 1, t: 2 }, { idx: 0, t: 2.5 }
        ]
    },
    'p10': {
        name: "10. Forest Walk (숲 산책)", sequence: [
            { idx: 0, t: 0 }, { idx: 1, t: 0.5 }, { idx: 0, t: 1 }, { idx: 2, t: 1.5 }, { idx: 0, t: 2 }, { idx: 3, t: 2.5 }, { idx: 0, t: 3 }, { idx: 4, t: 3.5 }
        ]
    },
    'p11': {
        name: "11. Ocean Waves (파도)", sequence: [
            { idx: 0, t: 0 }, { idx: 1, t: 0.3 }, { idx: 2, t: 0.6 }, { idx: 3, t: 0.9 }, { idx: 4, t: 1.2 }, { idx: 3, t: 1.5 }, { idx: 2, t: 1.8 }, { idx: 1, t: 2.1 }
        ]
    },
    'p12': {
        name: "12. Moon Dance (달의 춤)", sequence: [
            { idx: 1, t: 0 }, { idx: 4, t: 0.5 }, { idx: 7, t: 1 }, { idx: 4, t: 1.5 }, { idx: 1, t: 2 }, { idx: 0, t: 2.5 }, { idx: 3, t: 3 }, { idx: 6, t: 3.5 }
        ]
    },
    'p13': {
        name: "13. Firefly (반딧불이)", sequence: [
            { idx: 'ding', t: 0 }, { idx: 7, t: 1 }, { idx: 'ding', t: 2 }, { idx: 6, t: 3 }, { idx: 'ding', t: 4 }, { idx: 5, t: 5 }, { idx: 'ding', t: 6 }, { idx: 4, t: 7 }
        ]
    },
    'p14': {
        name: "14. Echo (메아리)", sequence: [
            { idx: 4, t: 0 }, { idx: 4, t: 0.5 }, { idx: 2, t: 1 }, { idx: 2, t: 1.5 }, { idx: 0, t: 2 }, { idx: 0, t: 2.5 }, { idx: 'ding', t: 3 }
        ]
    },
    'p15': {
        name: "15. Spring (봄)", sequence: [
            { idx: 0, t: 0 }, { idx: 2, t: 0.5 }, { idx: 4, t: 1 }, { idx: 5, t: 1.5 }, { idx: 7, t: 2 }, { idx: 5, t: 2.5 }, { idx: 4, t: 3 }, { idx: 2, t: 3.5 }
        ]
    },
    'p16': {
        name: "16. Meditation (명상)", sequence: [
            { idx: 'ding', t: 0 }, { idx: 0, t: 1.5 }, { idx: 2, t: 3 }, { idx: 4, t: 4.5 }, { idx: 7, t: 6 }
        ]
    },
    'p17': {
        name: "17. Flowing Water (유수)", sequence: [
            { idx: 7, t: 0 }, { idx: 5, t: 0.3 }, { idx: 3, t: 0.6 }, { idx: 1, t: 0.9 }, { idx: 0, t: 1.2 }, { idx: 2, t: 1.5 }, { idx: 4, t: 1.8 }, { idx: 6, t: 2.1 }
        ]
    },
    'p18': {
        name: "18. Heartbeat (심장)", sequence: [
            { idx: 'ding', t: 0 }, { idx: 'ding', t: 0.2 }, { idx: 0, t: 1 }, { idx: 0, t: 1.2 }, { idx: 4, t: 2 }, { idx: 4, t: 2.2 }
        ]
    },
    'p19': {
        name: "19. Ascent (상승)", sequence: [
            { idx: 0, t: 0 }, { idx: 1, t: 0.5 }, { idx: 2, t: 1 }, { idx: 3, t: 1.5 }, { idx: 4, t: 2 }, { idx: 5, t: 2.5 }, { idx: 6, t: 3 }, { idx: 7, t: 3.5 }
        ]
    },
    'p20': {
        name: "20. Harmony (조화)", sequence: [
            { idx: 0, t: 0 }, { idx: 2, t: 0 }, { idx: 4, t: 0 }, { idx: 1, t: 2 }, { idx: 3, t: 2 }, { idx: 5, t: 2 }, { idx: 'ding', t: 4 }
        ]
    }
};

// [기능 3] 음악 연주 데이터 (Songs: Sequence of Patterns)
const songs = [
    {
        name: "Morning Journey (아침 여행)",
        structure: [
            { pid: 'p1', label: 'Intro' }, { pid: 'p2', label: 'Flow' }, { pid: 'p2', label: 'Deep' },
            { pid: 'p5', label: 'Sunrise' }, { pid: 'p1', label: 'Outro' }
        ]
    },
    {
        name: "Night Meditation (밤의 명상)",
        structure: [
            { pid: 'p8', label: 'Stars' }, { pid: 'p12', label: 'Moon' }, { pid: 'p7', label: 'Breath' },
            { pid: 'p16', label: 'Silence' }, { pid: 'p8', label: 'Fade' }
        ]
    },
    {
        name: "Nature's Call (자연의 소리)",
        structure: [
            { pid: 'p4', label: 'Rain' }, { pid: 'p9', label: 'Wind' }, { pid: 'p17', label: 'Water' },
            { pid: 'p10', label: 'Forest' }, { pid: 'p4', label: 'Rain' }
        ]
    },
    {
        name: "Joyful Dance (기쁨의 춤)",
        structure: [
            { pid: 'p6', label: 'Gold' }, { pid: 'p15', label: 'Spring' }, { pid: 'p19', label: 'Rise' },
            { pid: 'p20', label: 'Harmony' }, { pid: 'p15', label: 'Joy' }
        ]
    }
];


// --- 2. 오디오 엔진 ---
let synth;
let isAudioStarted = false;

async function initAudio() {
    if (isAudioStarted) return;
    await Tone.start();

    synth = new Tone.PolySynth(Tone.FMSynth, {
        harmonicity: 3, modulationIndex: 10, detune: 0,
        oscillator: { type: "sine" },
        envelope: { attack: 0.01, decay: 0.5, sustain: 0.1, release: 3 },
        modulation: { type: "square" },
        modulationEnvelope: { attack: 0.5, decay: 0, sustain: 1, release: 0.5 }
    }).toDestination();

    const reverb = new Tone.Reverb({ decay: 8, wet: 0.4 }).toDestination();
    synth.connect(reverb);

    isAudioStarted = true;
    document.getElementById('status-text').innerText = "준비 완료.";
}

// --- 3. UI 생성 (Zig-Zag Layout) ---
const noteElements = [];

function createHandpanUI() {
    const container = document.getElementById('handpan-visual');
    const radius = 120; // 반지름 약간 키움
    const centerX = 160; const centerY = 160;

    // Ding(중앙)
    const ding = document.querySelector('.ding-note');
    ding.addEventListener('mousedown', () => playNote(dingNote, ding));
    ding.addEventListener('touchstart', (e) => { e.preventDefault(); playNote(dingNote, ding); });

    // 지그재그 배치 각도 (Bottom Center Start, Alternating Left/Right)
    // 0(A3): 6시
    // 1(Bb3): 8시 (왼쪽)
    // 2(C4): 4시 (오른쪽)
    // 3(D4): 9시 (왼쪽)
    // 4(E4): 3시 (오른쪽)
    // 5: 10.5시 (F4)
    // 6: 1.5시 (G4)
    // 7: 12시 (A4)

    // 배열 인덱스에 따른 각도(라디안) 매핑
    // 시계방향 0도 = 3시 기준
    const angles = [
        Math.PI / 2,         // 0: 6시 (A3)
        Math.PI * 0.75,      // 1: 7.5시 (Bb3)
        Math.PI * 0.25,      // 2: 4.5시 (C4)
        Math.PI,             // 3: 9시 (D4)
        0,                   // 4: 3시 (E4)
        Math.PI * 1.25,      // 5: 10.5시 (F4)
        Math.PI * 1.75,      // 6: 1.5시 (G4)
        Math.PI * 1.5        // 7: 12시 (A4)
    ];

    scaleNotes.forEach((note, index) => {
        const angle = angles[index];
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        const noteEl = document.createElement('div');
        noteEl.classList.add('note');
        noteEl.style.left = `${x}px`;
        noteEl.style.top = `${y}px`;
        noteEl.style.transform = `translate(-50%, -50%)`;
        noteEl.innerText = note.replace(/[0-9]/g, '').replace('b', '♭');

        noteEl.addEventListener('mousedown', () => playNote(note, noteEl));
        noteEl.addEventListener('touchstart', (e) => { e.preventDefault(); playNote(note, noteEl); });

        container.appendChild(noteEl);
        noteElements.push(noteEl);
    });

    // 리스트 생성 초기화
    initChordList();
    initPatternList();
    initSongList();
}

function playNote(note, element) {
    if (!isAudioStarted) initAudio();
    const velocity = 0.6 + Math.random() * 0.4;
    synth.triggerAttackRelease(note, "8n", Tone.now(), velocity);

    element.classList.add('active');
    setTimeout(() => element.classList.remove('active'), 200);

    // 레슨 모드 중이면 체크
    if (isLessonMode) checkLessonInput(note);
}

// 가이드 헬퍼
function highlightNoteIndex(index, isOn) {
    let el;
    if (index === 'ding') el = document.querySelector('.ding-note');
    else el = noteElements[index];

    if (el) {
        if (isOn) el.classList.add('guide');
        else el.classList.remove('guide');
    }
}
function clearHighlights() {
    document.querySelector('.ding-note').classList.remove('guide');
    noteElements.forEach(el => el.classList.remove('guide'));
}

// --- [기능 1] 화음 추천 (리스트 선택) ---
const chordModal = document.getElementById('chord-modal');
const chordListEl = document.getElementById('chord-list');
let chordTimeoutIds = [];
let isChordPlaying = false;

document.getElementById('btn-chord').addEventListener('click', () => {
    chordModal.classList.remove('hidden');
});
document.getElementById('close-chord').addEventListener('click', () => {
    chordModal.classList.add('hidden');
});

function initChordList() {
    chordProgressions.forEach((prog, idx) => {
        const btn = document.createElement('button');
        btn.className = 'list-item-btn';
        btn.innerText = prog.name;
        btn.addEventListener('click', () => {
            chordModal.classList.add('hidden');
            playSelectedChordProgression(idx);
        });
        chordListEl.appendChild(btn);
    });
}

function playSelectedChordProgression(index) {
    stopAllAudioLogic();
    if (!isAudioStarted) initAudio();

    isChordPlaying = true;
    const prog = chordProgressions[index];
    document.getElementById('status-text').innerText = `화음 진행: ${prog.name}`;

    let currentTime = 0;
    const stepDuration = 2000;

    // [추가] 화음 노트를 악보 영역에 표시 (전체 시퀀스를 하나로 합쳐서 보여줌 or 현재 진행중인 화음만?)
    // 요청: "화음에서 진행되고 있는 음계가 순서대로 적혀있게끔" -> 전체 진행을 보여줄 수도 있고, 현재 화음만 보여줄 수도 있음.
    // 여기서는 "현재 진행중인 화음"을 업데이트하며 보여주는 방식으로 구현 (더 직관적)

    // 악보 컨테이너 활성화
    scoreContainer.classList.remove('hidden');
    document.getElementById('song-roadmap').classList.add('hidden');
    document.getElementById('song-structure-list').classList.add('hidden'); // 대시보드 숨김

    prog.sequence.forEach((chordIndices, seqIdx) => {
        const tid = setTimeout(() => {
            clearHighlights();

            // 1. 악보(Score) 업데이트: 현재 화음의 구성음을 순서대로 나열
            scoreDisplay.innerHTML = ''; // 이전 화음 노트 지우기
            chordIndices.forEach((noteIdx, noteOrder) => {
                const n = scaleNotes[noteIdx];
                const label = n.replace(/[0-9]/g, '').replace('b', '♭');

                const span = document.createElement('span');
                span.className = 'score-note';
                span.innerText = label;
                // 약간의 시간차로 하이라이트 효과를 주기 위해 id 부여
                span.id = `chord-note-${seqIdx}-${noteOrder}`;
                scoreDisplay.appendChild(span);
            });

            // 2. 핸드팬 시각 효과
            chordIndices.forEach(idx => highlightNoteIndex(idx, true));

            // 3. 소리 재생 & 악보 하이라이트 (Arpeggio)
            playChordArpeggio(chordIndices, seqIdx);

        }, currentTime);
        chordTimeoutIds.push(tid);
        currentTime += stepDuration;
    });

    const endTid = setTimeout(() => {
        clearHighlights();
        isChordPlaying = false;
        document.getElementById('status-text').innerText = "화음 연주 완료.";
    }, currentTime);
    chordTimeoutIds.push(endTid);
}

function stopChordProgressions() {
    chordTimeoutIds.forEach(id => clearTimeout(id));
    chordTimeoutIds = [];
    clearHighlights();
    isChordPlaying = false;
}

function playChordArpeggio(indices, seqIdx) {
    const now = Tone.now();
    indices.forEach((idx, i) => {
        const note = scaleNotes[idx];
        // 0.1초 간격 아르페지오
        const timeOffset = i * 0.1;
        synth.triggerAttackRelease(note, "2n", now + timeOffset);

        // 악보 하이라이트 (소리에 맞춰서)
        setTimeout(() => {
            const span = document.getElementById(`chord-note-${seqIdx}-${i}`);
            if (span) {
                span.classList.add('active');
                // 0.5초 뒤 해제
                setTimeout(() => span.classList.remove('active'), 500);
            }
        }, timeOffset * 1000);
    });
}


// --- [기능 2] 패턴 레슨 모드 (리스트 & 악보) ---
const patternModal = document.getElementById('pattern-modal');
const patternListEl = document.getElementById('pattern-list');
const scoreContainer = document.getElementById('score-container');
const scoreDisplay = document.getElementById('score-display');
const currentPatternTitle = document.getElementById('current-pattern-name');

let lessonPatternData = []; // {idx, t}
let currentLessonStep = 0;
let isLessonMode = false;
let patternPlayTimeouts = [];

document.getElementById('btn-pattern').addEventListener('click', () => {
    patternModal.classList.remove('hidden');
});
document.getElementById('close-pattern').addEventListener('click', () => {
    patternModal.classList.add('hidden');
});
document.getElementById('btn-next-step').addEventListener('click', () => {
    showNextLessonStep();
});

function initPatternList() {
    // 키 정렬
    const keys = Object.keys(patterns);
    keys.sort((a, b) => {
        // p1, p2... 정수 정렬
        const numA = parseInt(a.slice(1));
        const numB = parseInt(b.slice(1));
        return numA - numB;
    });

    keys.forEach(key => {
        const pData = patterns[key];
        const btn = document.createElement('button');
        btn.className = 'list-item-btn';
        btn.innerText = pData.name;
        btn.addEventListener('click', () => {
            patternModal.classList.add('hidden');
            startPatternSequence(pData);
        });
        patternListEl.appendChild(btn);
    });
}

// 악보 생성
// 악보 생성
function renderScore(sequence) {
    scoreContainer.classList.remove('hidden');
    document.getElementById('song-roadmap').classList.add('hidden'); // 패턴 단독일땐 로드맵 숨김
    // 여기서 대시보드를 숨기지 않음 (Song Mode에서도 이 함수를 쓰기 때문)
    scoreDisplay.innerHTML = '';

    sequence.forEach((noteData, i) => {
        const span = document.createElement('span');
        span.className = 'score-note';
        span.id = `score-note-${i}`;

        // 이름 변환
        let label = '';
        if (noteData.idx === 'ding') label = 'Ding';
        else {
            let n = scaleNotes[noteData.idx];
            label = n.replace(/[0-9]/g, '').replace('b', '♭');
        }
        span.innerText = label;
        scoreDisplay.appendChild(span);
    });
}

function startPatternSequence(pData) {
    stopAllAudioLogic();
    if (!isAudioStarted) initAudio();

    lessonPatternData = pData.sequence;
    currentPatternTitle.innerText = pData.name;

    // 대시보드 숨기기 (패턴 모드이므로)
    document.getElementById('song-structure-list').classList.add('hidden');

    // 악보 표시
    renderScore(lessonPatternData);

    document.getElementById('status-text').innerText = "시범 연주 중... (악보를 보며 리듬을 익히세요)";

    // Play Logic moved to helper for reuse in songs
    playPatternOnce(lessonPatternData, 800, () => {
        enterLessonMode();
    });
}

// Helper: Play a single pattern
function playPatternOnce(sequence, baseTime, onComplete) {
    let playTime = 0;
    sequence.forEach((noteData, i) => {
        const delay = noteData.t * baseTime;

        const tid = setTimeout(() => {
            const noteName = (noteData.idx === 'ding') ? dingNote : scaleNotes[noteData.idx];

            // 소리 & 시각
            synth.triggerAttackRelease(noteName, "8n");
            highlightNoteIndex(noteData.idx, true);
            setTimeout(() => highlightNoteIndex(noteData.idx, false), 350);

            // 악보 하이라이트
            highlightScoreNote(i);

        }, delay);

        patternPlayTimeouts.push(tid);
        playTime = Math.max(playTime, delay);
    });

    const endTid = setTimeout(() => {
        clearScoreHighlights();
        if (onComplete) onComplete();
    }, playTime + 1000);
    patternPlayTimeouts.push(endTid);
}


function highlightScoreNote(index) {
    // 이전 것 끄기
    const prev = document.getElementById(`score-note-${index - 1}`);
    if (prev) prev.classList.remove('active');

    const curr = document.getElementById(`score-note-${index}`);
    if (curr) curr.classList.add('active');
}
function clearScoreHighlights() {
    document.querySelectorAll('.score-note').forEach(el => el.classList.remove('active'));
}

function enterLessonMode() {
    isLessonMode = true;
    currentLessonStep = -1;
    document.getElementById('status-text').innerText = "'다음 노트 치기' 버튼을 눌러 하나씩 배워보세요.";
    document.getElementById('practice-controls').classList.remove('hidden');
    clearHighlights();
}

function showNextLessonStep() {
    if (!isLessonMode) return;

    currentLessonStep++;
    if (currentLessonStep >= lessonPatternData.length) {
        finishLesson();
        return;
    }

    const target = lessonPatternData[currentLessonStep];
    const noteName = (target.idx === 'ding') ? dingNote : scaleNotes[target.idx];

    // 가이드 표시
    clearHighlights();
    highlightNoteIndex(target.idx, true);

    // 악보 표시
    clearScoreHighlights();
    const currScore = document.getElementById(`score-note-${currentLessonStep}`);
    if (currScore) currScore.classList.add('active');

    // 소리 들려주기
    synth.triggerAttackRelease(noteName, "8n");

    document.getElementById('status-text').innerText = `Step ${currentLessonStep + 1}: 해당 위치를 눌러보세요!`;
}

function checkLessonInput(playedNoteFull) {
    if (!isLessonMode || currentLessonStep < 0 || currentLessonStep >= lessonPatternData.length) return;

    const target = lessonPatternData[currentLessonStep];
    const targetNoteFull = (target.idx === 'ding') ? dingNote : scaleNotes[target.idx];

    if (playedNoteFull === targetNoteFull) {
        document.getElementById('status-text').innerText = "맞았습니다!";
        highlightNoteIndex(target.idx, false);
    }
}

function finishLesson() {
    isLessonMode = false;
    currentLessonStep = 0;
    document.getElementById('status-text').innerText = "참 잘했어요! 레슨 완료. 다른 패턴도 도전해보세요.";
    document.getElementById('practice-controls').classList.add('hidden');
    clearHighlights();
    clearScoreHighlights();
    scoreContainer.classList.add('hidden');
}


// --- [기능 3] 음악 연주 모드 (Songs) ---
const songModal = document.getElementById('song-modal');
const songListEl = document.getElementById('song-list');
const songRoadmap = document.getElementById('song-roadmap');

document.getElementById('btn-song').addEventListener('click', () => { songModal.classList.remove('hidden'); });
document.getElementById('close-song').addEventListener('click', () => { songModal.classList.add('hidden'); });

function initSongList() {
    songs.forEach((song, idx) => {
        const btn = document.createElement('button');
        btn.className = 'list-item-btn';
        btn.innerText = song.name;
        btn.addEventListener('click', () => {
            songModal.classList.add('hidden');
            playFullSong(song);
        });
        songListEl.appendChild(btn);
    });
}

function playFullSong(song) {
    stopAllAudioLogic();
    if (!isAudioStarted) initAudio();

    document.getElementById('status-text').innerText = `음악 연주 중: ${song.name}`;
    currentPatternTitle.innerText = song.name;

    scoreContainer.classList.remove('hidden');
    scoreDisplay.innerHTML = ''; // 노래 모드에선 상세 악보 숨김 or 로드맵만 표시
    songRoadmap.classList.remove('hidden');

    // Render Dashboard List (Vertical)
    const dashboardList = document.getElementById('song-structure-list');
    dashboardList.classList.remove('hidden');
    dashboardList.innerHTML = ''; // 초기화

    song.structure.forEach((part, i) => {
        const patternData = patterns[part.pid];

        const row = document.createElement('div');
        row.className = 'structure-row';
        row.id = `structure-row-${i}`;

        // 구조: <Label> <Pattern Name>
        const labelSpan = document.createElement('span');
        labelSpan.innerText = part.label;

        const infoSpan = document.createElement('span');
        infoSpan.innerText = `${patternData.name}`;

        row.appendChild(labelSpan);
        row.appendChild(infoSpan);
        dashboardList.appendChild(row);
    });

    // Chain Playback
    playSongPart(song, 0);
}

function playSongPart(song, partIndex) {
    if (partIndex >= song.structure.length) {
        document.getElementById('status-text').innerText = "연주가 끝났습니다. 멋진 연주였어요!";
        clearRoadmapHighlights();
        return;
    }

    // Highlight Dashboard Row
    clearRoadmapHighlights();
    const currRow = document.getElementById(`structure-row-${partIndex}`);
    if (currRow) {
        currRow.classList.add('active');
        currRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    const part = song.structure[partIndex];
    const patternData = patterns[part.pid];

    // [수정] 패턴 정보 표시 (몇번 패턴인지, 이름이 뭔지)
    // Roadmap에는 "Intro", "Flow" 등이 나오지만, 
    // 상세 정보창(Main Title or Status)에는 "Intro: 1. Morning Light (P1)" 처럼 표시
    currentPatternTitle.innerText = `${part.label}: ${patternData.name} (${part.pid.toUpperCase()})`;

    // [추가] 리듬/음계 가이드 표시 (renderScore 재사용)
    // 사용자가 리듬을 알 수 있게 전체 패턴 악보를 보여줌
    scoreDisplay.innerHTML = '';
    renderScore(patternData.sequence);

    // Play this pattern
    // baseTime 600으로 약간 빠르게
    playPatternOnce(patternData.sequence, 600, () => {
        // Next part
        playSongPart(song, partIndex + 1);
    });
}

function clearRoadmapHighlights() {
    document.querySelectorAll('.structure-row').forEach(el => el.classList.remove('active'));
}


function stopAllAudioLogic() {
    stopChordProgressions();

    patternPlayTimeouts.forEach(id => clearTimeout(id));
    patternPlayTimeouts = [];

    isLessonMode = false;
    document.getElementById('practice-controls').classList.add('hidden');
    clearHighlights();
    clearScoreHighlights();
    clearRoadmapHighlights();
}


// --- 4. 호흡 가이드 등 기타 ---
// 기존 코드 유지 (Breathing)
const breatheBtn = document.getElementById('btn-breathe');
const overlay = document.getElementById('breathing-overlay');
const closeBreathBtn = document.getElementById('close-breath');
const breathText = document.getElementById('breath-text');
let breathInterval;

breatheBtn.addEventListener('click', () => { overlay.classList.remove('hidden'); startBreathing(); });
closeBreathBtn.addEventListener('click', () => { overlay.classList.add('hidden'); stopBreathing(); });

function startBreathing() {
    if (!isAudioStarted) initAudio();
    const circle = document.querySelector('.circle-guide');
    circle.classList.add('breathing-active');
    const updateText = () => {
        breathText.innerText = "Inhale (들이마세요)";
        setTimeout(() => { breathText.innerText = "Hold (멈춤)"; }, 3200);
        setTimeout(() => { breathText.innerText = "Exhale (내뱉으세요)"; }, 4000);
    };
    updateText();
    breathInterval = setInterval(updateText, 8000);
}
function stopBreathing() {
    document.querySelector('.circle-guide').classList.remove('breathing-active');
    clearInterval(breathInterval);
}

// 모달
const moodModal = document.getElementById('mood-modal');
document.getElementById('btn-mood').addEventListener('click', () => { moodModal.classList.remove('hidden'); });
document.getElementById('close-mood').addEventListener('click', () => { moodModal.classList.add('hidden'); });
document.querySelectorAll('.mood-options button').forEach(btn => {
    btn.addEventListener('click', () => { moodModal.classList.add('hidden'); });
});


// 초기화
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', initAudio, { once: true });
    createHandpanUI();
});