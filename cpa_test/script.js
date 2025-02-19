/**
 * @typedef {Object} Chapter
 * @property {string} name - 章节名称
 * @property {number} percentage - 内容占比
 * @property {boolean} round1 - 第一轮学习状态
 * @property {boolean} round2 - 第二轮学习状态
 * @property {boolean} round3 - 第三轮学习状态
 */

/** @type {Chapter[]} */
const chapters = [
    { name: "Chapter1总论", percentage: 3 },
    { name: "Chapter2存货", percentage: 4 },
    { name: "Chapter3固定资产", percentage: 4 },
    { name: "Chapter4无形资产", percentage: 3 },
    { name: "Chapter5投资性房地产", percentage: 2 },
    { name: "Chapter6长期股权投资", percentage: 4 },
    { name: "Chapter7资产减值", percentage: 3 },
    { name: "Chapter8负债", percentage: 4 },
    { name: "Chapter9职工薪酬", percentage: 3 },
    { name: "Chapter10股份支付", percentage: 3 },
    { name: "Chapter11借款费用", percentage: 2 },
    { name: "Chapter12或有事项", percentage: 3 },
    { name: "Chapter13金融工具", percentage: 5 },
    { name: "Chapter14租赁", percentage: 4 },
    { name: "Chapter15持有待售的非流动资产、处置组和终止经营", percentage: 2 },
    { name: "Chapter16所有者权益", percentage: 4 },
    { name: "Chapter17收入、费用、利润", percentage: 4 },
    { name: "Chapter18政府补助", percentage: 3 },
    { name: "Chapter19所得税会计", percentage: 4 },
    { name: "Chapter20非货币性资产交换", percentage: 2 },
    { name: "Chapter21债务重组", percentage: 2 },
    { name: "Chapter22外币折算", percentage: 3 },
    { name: "Chapter23财务报告", percentage: 4 },
    { name: "Chapter24会计政策、会计估计及其变更和差错更正", percentage: 4 },
    { name: "Chapter25资产负债表日后事项", percentage: 3 },
    { name: "Chapter26合营安排与企业合并", percentage: 4 },
    { name: "Chapter27合并财务报表", percentage: 5 },
    { name: "Chapter28每股收益", percentage: 3 },
    { name: "Chapter29公允价值计量", percentage: 3 },
    { name: "Chapter30政府及民间非营利组织会计", percentage: 3 }
];

/**
 * 初始化表格数据
 */
function initializeTable() {
    const tableBody = document.getElementById('chapter-body');
    
    chapters.forEach((chapter, index) => {
        chapter.round1 = false;
        chapter.round2 = false;
        chapter.round3 = false;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${chapter.name}</td>
            <td>${chapter.percentage}%</td>
            <td><input type="checkbox" data-round="1" data-index="${index}"></td>
            <td><input type="checkbox" data-round="2" data-index="${index}"></td>
            <td><input type="checkbox" data-round="3" data-index="${index}"></td>
        `;
        tableBody.appendChild(row);
    });
}

/**
 * 计算学习进度
 * @param {number} round - 学习轮次
 * @returns {number} 进度百分比
 */
function calculateProgress(round) {
    const completedPercentage = chapters.reduce((sum, chapter) => {
        return sum + (chapter[`round${round}`] ? chapter.percentage : 0);
    }, 0);
    return completedPercentage;
}

/**
 * 更新进度条显示
 */
function updateProgress() {
    for (let round = 1; round <= 3; round++) {
        const progress = calculateProgress(round);
        const progressBar = document.getElementById(`progress${round}`);
        const progressText = document.getElementById(`progress${round}-text`);
        
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${progress}%`;
    }
}

/**
 * 初始化事件监听
 */
function initializeEventListeners() {
    document.getElementById('chapter-table').addEventListener('change', (event) => {
        if (event.target.type === 'checkbox') {
            const round = event.target.dataset.round;
            const index = event.target.dataset.index;
            chapters[index][`round${round}`] = event.target.checked;
            updateProgress();
        }
    });
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeTable();
    initializeEventListeners();
    updateProgress();
}); 