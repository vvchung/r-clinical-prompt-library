

import type { Prompt, NavItem } from './types';
import { 
    BookOpenIcon, 
    HeartIcon, 
    ChartBarIcon, 
    SparklesIcon, 
    PresentationChartLineIcon,
    BeakerIcon,
    LightBulbIcon
} from './components/icons';

// 用於主畫面上方篩選按鈕的場景標籤
export const SCENE_TAGS: string[] = [
  '描述性統計',
  '統計檢定',
  '迴歸分析',
  '多變量繪圖',
  '資料匯入與清洗',
  '臨床影像分析',
  '流行病學模型',
  '存活分析',
  '混合模型',
  'HMM',
  '潛在類別分析',
  '變點分析'
];

// 用於側邊欄導航的分類邏輯
const DATA_VIZ_CATEGORIES = ['描述性統計', '資料匯入與清洗', '單變量繪圖', '雙變量繪圖', '多變量繪圖', '圖表美化與輸出', '動態與互動視覺化'];
const STATS_MODEL_CATEGORIES = ['統計檢定', '迴歸分析', '時間序列分析', '非監督式學習', '進階統計模型', '程式碼除錯'];
export const CLINICAL_CATEGORIES = ['因果推論', '流行病學模型', '臨床影像分析', '離散選擇實驗 (DCE)', '統計檢定'];

// 側邊欄導航項目
export const NAV_ITEMS: NavItem[] = [
  { name: '所有指令', icon: BookOpenIcon, filter: () => true },
  { name: '我的收藏', icon: HeartIcon, filter: (p) => p.isFavorite === true },
  { name: '資料處理與視覺化', icon: ChartBarIcon, filter: (p) => DATA_VIZ_CATEGORIES.includes(p.category) },
  { name: '統計模型與分析', icon: BeakerIcon, filter: (p) => STATS_MODEL_CATEGORIES.includes(p.category) },
  { name: '臨床應用精選', icon: PresentationChartLineIcon, filter: (p) => CLINICAL_CATEGORIES.includes(p.category) || p.tags.includes('存活分析') },
  { name: '許願池', icon: LightBulbIcon },
];


export const PROMPTS: Prompt[] = [
  {
    id: 1,
    title: 'ggplot2 基礎：散佈圖與迴歸線',
    difficulty: '1. 入門必學',
    category: '雙變量繪圖',
    uses: 1850,
    likes: 730,
    description: '學術圖表第一步，快速繪製兩個連續變數的關係圖，並加上線性迴歸線與信賴區間。',
    tags: ['R 語言', 'ggplot2', '散點圖', '迴歸'],
    isFavorite: true,
    essentialRank: 1,
    usageContext: '當您需要探索兩個連續變數（例如：車重與油耗、劑量與反應）之間的關係，並以視覺化方式呈現其趨勢時，散佈圖是最佳選擇。',
    usageInstructions: '請將 `# 資料與變數設定` 區塊中的 `mtcars`, `wt`, 和 `mpg` 替換成您自己的**資料集名稱**、**X軸變數**和**Y軸變數**。使用 `labs()` 可自訂您的圖表標題。',
    fullPrompt: `我是一名研究生，正在使用 R 語言的 ggplot2 套件為學術論文繪製圖表。

# 我的背景資訊
- **研究目的：** 探索 'wt' (車重) 與 'mpg' (油耗) 之間的關係。
- **資料集：** 使用 R 內建的 \`mtcars\` 資料集。

# 我的任務
請為我生成一段 R 程式碼，完成以下繪圖任務：
1. 繪製一張以 \`wt\` 為 X 軸，\`mpg\` 為 Y 軸的散佈圖。
2. 在散佈圖上添加一條**線性迴歸線**，並顯示 **95% 信賴區間**。
3. 使用 \`theme_classic()\` 或 \`theme_bw()\` 使圖表風格更符合學術論文要求。
4. 為圖表、X軸和Y軸加上專業的中文標題與單位。

# 程式碼與結果要求
- 請確保程式碼的整潔與可讀性，並附上中文註解解釋關鍵步驟。
- 最終圖表應清晰呈現變數關係與趨勢。`
  },
  {
    id: 2,
    title: 't-檢定與結果視覺化 (箱型圖)',
    difficulty: '2. 核心統計',
    category: '統計檢定',
    uses: 950,
    likes: 410,
    description: '執行兩獨立樣本t檢定，並使用 ggplot2 的箱型圖視覺化兩組差異，是論文中最常見的比較圖。',
    tags: ['R 語言', 't-檢定', 'ggplot2', '箱型圖'],
    essentialRank: 2,
    isFavorite: true,
    usageContext: '當您需要比較兩組（例如：實驗組 vs. 對照組）在某個連續變數上的差異是否具有統計顯著性時，此指令結合了統計檢定與視覺化呈現。',
    usageInstructions: '請將 `# 資料與變數設定` 中的 `sleep`, `extra`, 和 `group` 替換成您的**資料集名稱**、**數值變數**和**分組變數**。',
    fullPrompt: `我正在進行一項研究，需要比較兩組數據的差異，並將結果視覺化。

# 我的背景資訊
- **研究目的：** 比較兩種藥物對睡眠時間延長的影響是否有顯著差異。
- **資料集：** 使用 R 內建的 \`sleep\` 資料集。
- **變數說明:**
    - \`extra\`: 睡眠時間的增加量 (連續變數)。
    - \`group\`: 藥物分組 (分類變數, '1' 和 '2')。

# 我的任務
請提供 R 程式碼完成以下兩個任務：
1.  **統計分析：** 執行一個兩獨立樣本 t-檢定，判斷兩組藥物的平均效果 (\`extra\`) 是否有顯著差異。
2.  **結果視覺化：** 使用 \`ggplot2\` 繪製一個箱型圖 (Box Plot)，呈現兩組數據的分佈情況與差異。

# 程式碼與結果要求
- **t-檢定：** 請清楚地呈現 t-statistic 和 p-value。
- **箱型圖：**
    - 使用 \`geom_boxplot()\` 繪製。
    - 加上統計顯著性的標示 (例如，使用 \`ggpubr::stat_compare_means\`)。
    - 使用學術風格的主題，如 \`theme_bw()\`。
    - 附上清晰的中文標題與座標軸標籤。
- 請附上中文註解。`
  },
  {
    id: 3,
    title: '學術論文級圖片輸出 (ggsave)',
    difficulty: '1. 入門必學',
    category: '圖表美化與輸出',
    uses: 2100,
    likes: 980,
    description: '使用 ggsave() 函數，將 ggplot2 圖形儲存為符合期刊要求的 300dpi 高解析度圖片 (TIFF/PNG)。',
    tags: ['R 語言', 'ggplot2', '圖片輸出', '論文發表'],
    essentialRank: 3,
    isFavorite: false,
    usageContext: '完成 \`ggplot2\` 繪圖後，最後一步就是輸出符合學術期刊投稿要求的高品質圖片檔案。此指令提供 \`ggsave\` 的標準設定。',
    usageInstructions: '請將 \`my_ggplot\` 替換成您的 ggplot 物件名稱。您可以修改 \`filename\` 來命名檔案與格式，並在 \`width\`, \`height\`, \`units\`, \`dpi\` 中設定圖片的尺寸與解析度。',
    fullPrompt: `我已經使用 ggplot2 創建了一個名為 'my_plot' 的圖形物件，現在需要將其儲存為檔案，以用於學術論文發表。

# 我的背景資訊
- **圖形物件名稱:** \`my_plot\`
- **目標用途:** 投稿至學術期刊。

# 我的任務
請提供一段使用 \`ggsave()\` 函數的 R 程式碼，將 \`my_plot\` 儲存為符合發表要求的圖片檔案。

# 程式碼與結果要求
1.  **檔案格式：** 請提供儲存為 **TIFF** 和 **PNG** 兩種格式的範例。
2.  **解析度 (Resolution)：** 設定為 **300 dpi**。
3.  **尺寸 (Dimensions)：** 設定寬度為 7 英吋，高度為 5 英吋。
4.  請在程式碼中用中文註解解釋 \`ggsave()\` 各個重要參數的意義，包括 \`filename\`, \`plot\`, \`width\`, \`height\`, \`units\`, 和 \`dpi\`。`
  },
   {
    id: 4,
    title: 'R Markdown 報告基本框架',
    difficulty: '2. 核心統計',
    category: 'R Markdown報告',
    uses: 720,
    likes: 280,
    description: '快速生成包含 YAML 標頭、R 程式碼區塊與視覺化結果的 R Markdown 可重複性報告。',
    tags: ['R 語言', 'R Markdown', '報告撰寫'],
    isFavorite: false,
    usageContext: '撰寫研究報告或與指導教授、合作者溝通時，R Markdown 能將您的程式碼、圖表和文字說明整合在同一份文件中，確保研究的可重複性。',
    usageInstructions: '直接複製此框架到一個新的 \`.Rmd\` 檔案中。您可以在 \`\`\`{r}\`\`\` 區塊中放入自己的程式碼，並在外部用 Markdown 語法撰寫文字說明。',
    fullPrompt: `我需要為我的研究專案創建一份可重複的分析報告，我希望使用 R Markdown 來整合我的分析流程與結果。

# 我的任務
請提供一個標準的 R Markdown (.Rmd) 文件範本，此範本應包含以下結構與元素：

# 範本要求
1.  **YAML 標頭：** 包含標題 (Title)、作者 (Author)、日期 (Date)，並設定輸出格式為 HTML (\`html_document\`)。
2.  **文字說明：** 使用 Markdown 語法撰寫一個簡短的介紹段落。
3.  **R 程式碼區塊 (Code Chunk)：**
    -   一個用於**載入套件** (如 ggplot2) 的程式碼區塊。
    -   一個用於**載入數據** (例如 \`iris\` 資料集) 的程式碼區塊。
    -   一個用於**生成圖表** (例如使用 \`ggplot2\` 繪製 \`iris\` 資料的散佈圖) 的程式碼區塊。
4.  **程式碼區塊選項：** 在生成圖表的程式碼區塊中，請使用選項 \`echo=FALSE\` 來**隱藏程式碼**，只顯示圖表結果。
5.  請在範本中加入簡短的中文註解，說明各個部分的作用。`
  },
  {
    id: 5,
    title: '使用 pheatmap 繪製熱力圖',
    difficulty: '3. 進階應用',
    category: '多變量繪圖',
    uses: 430,
    likes: 150,
    description: '視覺化呈現矩陣數據，常用於基因表現分析或相關性矩陣，並自動進行層次聚類。',
    tags: ['R 語言', 'pheatmap', '熱力圖', '基因體學'],
    isFavorite: false,
    usageContext: '當您有一組矩陣數據（例如：不同樣本的基因表現量、多個變數間的相關係數矩陣），並希望直觀地找出其中的模式時，熱力圖是強大的視覺化工具。',
    usageInstructions: '請將 `# 建立範例數據` 部分替換成您自己的數據矩陣。您可以透過調整 `pheatmap` 函數中的參數（如 `cluster_rows`, `color`, `fontsize`）來客製化圖表。',
    fullPrompt: `我需要使用 R 語言繪製一張熱力圖 (Heatmap) 來視覺化一個數值矩陣。

# 我的背景資訊
- **研究目的：** 探索一個矩陣中行與列之間的模式，常用於基因表現數據分析。
- **任務：** 視覺化呈現數據，並對行和列進行層次聚類 (Hierarchical Clustering)。

# 我的任務
請提供一段使用 \`pheatmap\` 套件的 R 程式碼，完成以下任務：

# 程式碼與結果要求
1.  首先，生成一個 10x10 的隨機數值矩陣作為範例數據。
2.  使用 \`pheatmap()\` 函數來繪製熱力圖。
3.  在熱力圖中，**同時對行和列進行聚類**。
4.  自訂顏色，使用從藍色到白再到紅色的漸變色。
5.  請在程式碼中附上中文註解，解釋主要步驟和參數。`
  },
  {
    id: 6,
    title: '小提琴圖 (Violin Plot) 繪製',
    difficulty: '2. 核心統計',
    category: '單變量繪圖',
    uses: 680,
    likes: 210,
    description: '結合箱型圖與密度圖的優點，更詳細地展示不同組別數據的分佈形狀、中位數與離散程度。',
    tags: ['R 語言', 'ggplot2', '視覺化', '分佈'],
    isFavorite: true,
    usageContext: '當您想比較多個組別的數值分佈，但又想比傳統箱型圖看到更多細節（如分佈是否為雙峰）時，小提琴圖是絕佳的選擇。',
    usageInstructions: '請將 `# 資料與變數設定` 中的 `iris`, `Species`, 和 `Sepal.Length` 替換成您自己的**資料集名稱**、**X軸分類變數**和**Y軸數值變數**。',
    fullPrompt: `我正在比較不同組別的數據分佈，希望使用比箱型圖更詳細的視覺化方法。

# 我的背景資訊
- **研究目的：** 比較三種不同鳶尾花 (\`Species\`) 的萼片長度 (\`Sepal.Length\`) 的分佈情況。
- **資料集：** 使用 R 內建的 \`iris\` 資料集。

# 我的任務
請提供一段使用 \`ggplot2\` 的 R 程式碼，繪製一張小提琴圖 (Violin Plot)。

# 程式碼與結果要求
1.  以 \`Species\` 作為 X 軸，\`Sepal.Length\` 作為 Y 軸。
2.  使用 \`geom_violin()\` 函數繪製圖形。
3.  **在小提琴圖內部疊加一個小型的箱型圖**，以同時顯示中位數和四分位距 (使用 \`geom_boxplot()\`)。
4.  為不同組別 (\`Species\`) 填充不同的顏色。
5.  使用學術風格主題，並加上清晰的中文標題與座標軸標籤。
6.  請附上中文註解。`
  },
  {
    id: 7,
    title: '單因子變異數分析 (One-Way ANOVA)',
    difficulty: '2. 核心統計',
    category: '統計檢定',
    uses: 650,
    likes: 320,
    description: '比較三個或以上獨立組別在某個連續變數上的平均數差異，並進行事後檢定 (Post-Hoc Test)。',
    tags: ['R 語言', 'ANOVA', 'aov', 'TukeyHSD'],
    isFavorite: false,
    essentialRank: 4,
    usageContext: '當您的研究涉及比較多個組別（例如：三種不同的治療方法）的效果時，ANOVA 是檢定其平均數是否存在顯著差異的標準方法。',
    usageInstructions: '請將 `iris`, `Sepal.Length`, 和 `Species` 替換成您的**資料集名稱**、**連續應變數**和**多分組自變數**。',
    fullPrompt: `我正在進行一項比較多組實驗結果的研究，需要使用 R 語言進行單因子變異數分析 (One-Way ANOVA)。

# 我的背景資訊
- **研究目的：** 檢定三種不同的鳶尾花品種 ('Species') 其萼片長度 ('Sepal.Length') 的平均值是否存在顯著差異。
- **資料集：** 使用 R 內建的 \`iris\` 資料集。

# 我的任務
請提供 R 程式碼，完成以下分析流程：
1.  **執行 ANOVA：** 使用 \`aov()\` 函數建立 ANOVA 模型。
2.  **查看結果：** 使用 \`summary()\` 函數顯示 ANOVA 表格，判斷組間是否存在顯著差異 (根據 p-value)。
3.  **事後檢定 (Post-Hoc Test)：** 如果 ANOVA 結果顯著，請接著使用 \`TukeyHSD()\` 函數進行事後檢定，找出是哪些組別之間存在差異。
4.  **結果視覺化：** 使用 \`ggplot2\` 繪製箱型圖，直觀地呈現各組分佈與差異。

# 程式碼與結果要求
- 請在程式碼中附上清晰的中文註解。
- 最終應呈現完整的統計分析摘要與一張清晰的視覺化圖表。`
  },
  {
    id: 8,
    title: '卡方檢定 (Chi-Squared Test)',
    difficulty: '2. 核心統計',
    category: '統計檢定',
    uses: 580,
    likes: 250,
    description: '檢定兩個類別變數之間是否存在關聯性，常用於問卷分析中的頻率資料。',
    tags: ['R 語言', '卡方檢定', 'chisq.test', '類別資料'],
    isFavorite: false,
    usageContext: '當您想知道兩個分類變項之間是否獨立時（例如：性別與投票偏好、不同教育程度對某個選項的選擇差異），卡方檢定是首選的統計方法。',
    usageInstructions: '請先用 \`table()\` 函數建立您的兩個類別變數的列聯表 (contingency table)，然後將該表格物件傳入 \`chisq.test()\`。',
    fullPrompt: `我正在分析一份問卷數據，需要使用 R 語言檢定兩個類別變數之間的關聯性。

# 我的背景資訊
- **研究目的：** 探討 \`mtcars\` 資料集中，汽車的汽缸數 ('cyl') 與其變速箱類型 ('am', 0=自排, 1=手排) 是否存在關聯。
- **資料集：** 使用 R 內建的 \`mtcars\` 資料集。

# 我的任務
請提供 R 程式碼，完成以下卡方檢定流程：
1.  **建立列聯表：** 使用 \`table()\` 函數，建立 'cyl' 和 'am' 兩個變數的列聯表 (contingency table)。
2.  **執行卡方檢定：** 將建立的列聯表傳入 \`chisq.test()\` 函數中進行檢定。
3.  **解讀結果：** 根據輸出的卡方值 (X-squared)、自由度 (df) 和 p-value，判斷兩個變數是否獨立。

# 程式碼與結果要求
- 請在程式碼中附上清晰的中文註解。
- 清楚地呈現列聯表與卡方檢定的統計結果。`
  },
  {
    id: 9,
    title: '多元線性迴歸分析 (Multiple Regression)',
    difficulty: '3. 進階應用',
    category: '統計檢定',
    uses: 390,
    likes: 180,
    description: '建立一個模型，用多個自變數來預測一個連續的應變數，並評估各變數的影響力。',
    tags: ['R 語言', '迴歸分析', 'lm', '多元迴歸'],
    isFavorite: false,
    usageContext: '當您認為一個結果（應變數）可能同時受到多個因素（自變數）影響時，多元迴歸可以幫助您建立預測模型，並釐清每個因素的相對重要性。',
    usageInstructions: '在 \`lm()\` 的公式中，將 \`mpg\` 替換為您的**應變數**，並在 \`~\` 後方用 \`+\` 連接所有您想納入的**自變數**（例如 \`wt + qsec + am\`）。',
    fullPrompt: `我需要建立一個預測模型，探討多個因素如何共同影響一個結果變數。

# 我的背景資訊
- **研究目的：** 使用 \`mtcars\` 資料集，探討車重 ('wt')、1/4英里所需時間 ('qsec') 和變速箱類型 ('am') 如何共同影響車輛的油耗 ('mpg')。
- **資料集：** R 內建的 \`mtcars\` 資料集。
- **變數角色：**
    - 應變數 (Y): \`mpg\`
    - 自變數 (X): \`wt\`, \`qsec\`, \`am\`

# 我的任務
請提供 R 程式碼，執行多元線性迴歸分析 (Multiple Linear Regression)。

# 程式碼與結果要求
1.  **建立模型：** 使用 \`lm()\` 函數建立迴歸模型，公式應為 \`mpg ~ wt + qsec + am\`。
2.  **檢視模型摘要：** 使用 \`summary()\` 函數輸出完整的模型分析結果。
3.  **結果解讀：** 在註解中簡要說明如何解讀模型摘要中的幾個關鍵指標：
    -   每個自變數的估計係數 (Estimate) 和 p-value (Pr(>|t|))。
    -   模型的 R-squared 和 Adjusted R-squared 值。
    -   模型的整體 F-statistic 和 p-value。`
  },
  {
    id: 10,
    title: 'Mann-Whitney U 檢定 (Wilcoxon 秩和檢定)',
    difficulty: '3. 進階應用',
    category: '統計檢定',
    uses: 250,
    likes: 95,
    description: '當數據不符合常態分佈時，用來取代 t-檢定的非參數方法，比較兩個獨立組別的中位數差異。',
    tags: ['R 語言', '非參數檢定', 'wilcox.test', '常態性'],
    isFavorite: false,
    usageContext: '在進行兩組比較前，若您的數據經檢定為非常態分佈，或樣本數過小，Mann-Whitney U 檢定是比 t-檢定更穩健的替代方案。',
    usageInstructions: '使用方式與 \`t.test\` 類似，請在公式中 \`~\` 的前後分別放入您的**數值變數**與**分組變數**。',
    fullPrompt: `我正在比較兩組數據，但數據分佈不符合常態性假設，因此需要使用非參數方法。

# 我的背景資訊
- **研究目的：** 比較兩種藥物 ('group' 1 vs 2) 對睡眠時間延長量 ('extra') 的影響，但數據可能不是常態分佈。
- **資料集：** 使用 R 內建的 \`sleep\` 資料集。

# 我的任務
請提供 R 程式碼，完成以下兩個任務：
1.  **常態性檢定 (選做但建議)：** 使用 \`shapiro.test()\` 分別檢定兩組數據是否符合常態分佈，以確認使用非參數檢定的必要性。
2.  **執行 Mann-Whitney U 檢定：** 使用 \`wilcox.test()\` 函數比較兩組 ('group') 在 'extra' 變數上的中位數是否存在顯著差異。

# 程式碼與結果要求
- 請提供常態性檢定的程式碼與判斷方式。
- 清楚地呈現 Mann-Whitney U 檢定 (Wilcoxon rank sum test) 的 W-statistic 和 p-value。
- 在程式碼中附上清晰的中文註解。`
  },
  {
    id: 11,
    title: '存活分析：Kaplan-Meier 曲線繪製',
    difficulty: '3. 進階應用',
    category: '統計檢定',
    uses: 320,
    likes: 190,
    description: '繪製 Kaplan-Meier 存活曲線，比較不同組別的存活機率，並加上信賴區間與風險表 (Risk Table)。',
    tags: ['R 語言', '存活分析', 'Kaplan-Meier', 'ggsurvplot', 'survival'],
    isFavorite: false,
    usageContext: '在臨床研究中，當您需要分析並視覺化「事件發生時間」數據時（例如：患者存活時間、疾病復發時間），Kaplan-Meier 曲線是標準的分析方法。',
    usageInstructions: '請安裝並載入 \`survival\` 與 \`survminer\` 套件。將 \`lung\`, \`time\`, \`status\`, 和 \`sex\` 替換成您自己的**資料集名稱**、**時間變數**、**事件狀態變數**（通常 1=事件發生, 0=設限），以及**分組變數**。',
    fullPrompt: `我正在進行一項臨床存活分析，需要使用 R 語言繪製 Kaplan-Meier 存活曲線。

# 我的背景資訊
- **研究目的：** 比較男性與女性肺癌患者的存活曲線差異。
- **資料集：** 使用 \`survival\` 套件內建的 \`lung\` 資料集。
- **變數說明:**
    - \`time\`: 存活或追蹤時間（天）。
    - \`status\`: 存活狀態 (1=存活, 2=死亡)。注意：需要轉換為 0/1 格式。
    - \`sex\`: 性別 (1=男, 2=女)。

# 我的任務
請提供 R 程式碼，使用 \`survival\` 和 \`survminer\` 套件完成以下任務：
1.  **資料前處理：** 將 \`lung\` 資料集的 \`status\` 變數轉換為 R 的存活物件能識別的格式 (1 -> 0, 2 -> 1)。
2.  **建立存活物件：** 使用 \`Surv()\` 函數建立存活時間與事件的物件。
3.  **擬合存活曲線：** 使用 \`survfit()\` 函數，根據性別 ('sex') 擬合存活曲線。
4.  **視覺化曲線：** 使用 \`ggsurvplot()\` 函數繪製 Kaplan-Meier 曲線，並包含以下元素：
    -   顯示 95% 信賴區間 (\`conf.int = TRUE\`)。
    -   在圖下方加上風險表 (\`risk.table = TRUE\`)。
    -   在圖上顯示 p-value (\`pval = TRUE\`)。
    -   提供清晰的中文圖例與標題。
- 請附上中文註解。`
  },
  {
    id: 12,
    title: '羅吉斯迴歸分析與勝算比 (Odds Ratio)',
    difficulty: '3. 進階應用',
    category: '統計檢定',
    uses: 410,
    likes: 220,
    description: '當應變數為二元類別時，建立羅吉斯迴歸模型，並計算各變數的勝算比 (Odds Ratio) 及其信賴區間。',
    tags: ['R 語言', '羅吉斯迴歸', 'glm', 'Odds Ratio'],
    isFavorite: false,
    usageContext: '當您的研究結果是二元的（例如：有/無疾病、成功/失敗、存活/死亡），並希望探討多個預測變數對此結果的影響時，羅吉斯迴歸是標準的分析方法。',
    usageInstructions: '在 \`glm()\` 的 \`formula\` 中，將 \`vs\` 替換為您的**二元應變數**，並在 \`~\` 後方用 \`+\` 連接所有您想納入的**自變數**。確認 \`family = "binomial"\`。',
    fullPrompt: `我需要分析一個二元結果變數，並了解不同預測因子對其發生的影響。

# 我的背景資訊
- **研究目的：** 探討 \`mtcars\` 資料集中，車輛的油耗 ('mpg') 和車重 ('wt') 是否能預測引擎的 V/S 類型 ('vs', 0 = V型, 1 = 直列)。
- **資料集：** R 內建的 \`mtcars\` 資料集。
- **變數角色：**
    - 應變數 (Y): \`vs\` (二元變數: 0 或 1)
    - 自變數 (X): \`mpg\`, \`wt\`

# 我的任務
請提供 R 程式碼，執行羅吉斯迴歸分析 (Logistic Regression)。

# 程式碼與結果要求
1.  **建立模型：** 使用 \`glm()\` 函數建立迴歸模型，並設定 \`family = "binomial"\`。
2.  **檢視模型摘要：** 使用 \`summary()\` 函數顯示模型結果。
3.  **計算勝算比 (Odds Ratios)：**
    -   對模型的係數取指數 (\`exp(coef(model))\`) 來計算 OR。
    -   同時計算 OR 的 95% 信賴區間 (\`exp(confint(model))\`)。
4.  **解讀結果：** 在註解中簡要說明如何解讀勝算比。例如，OR > 1 代表什麼意義。`
  },
  {
    id: 13,
    title: '森林圖 (Forest Plot) 繪製',
    difficulty: '3. 進階應用',
    category: '多變量繪圖',
    uses: 280,
    likes: 160,
    description: '視覺化呈現多個研究或迴歸模型係數的點估計與信賴區間，常用於統合分析 (Meta-analysis)。',
    tags: ['R 語言', '森林圖', 'ggplot2', '統合分析', 'Meta-analysis'],
    isFavorite: false,
    usageContext: '當您需要整合並比較來自不同研究、不同模型、或不同次群組的效應值（如 Odds Ratio, Hazard Ratio）時，森林圖能提供清晰的視覺摘要。',
    usageInstructions: '請先建立一個包含**研究/變數名稱**、**點估計值**、**信賴區間下限**、**信賴區間上限**的 data frame，然後將其傳入 \`ggplot\`。',
    fullPrompt: `我正在進行一項統合分析 (Meta-analysis)，需要將來自不同研究的勝算比 (Odds Ratios) 及其信賴區間用森林圖 (Forest Plot) 進行視覺化。

# 我的背景資訊
- **研究目的：** 綜合呈現三項不同研究對於某個因子與疾病關聯性的 OR 值。
- **數據：** 我已經整理好以下數據：
    - 研究 A: OR=1.5, 95% CI [1.1, 2.0]
    - 研究 B: OR=0.8, 95% CI [0.6, 1.1]
    - 研究 C: OR=2.1, 95% CI [1.4, 3.0]

# 我的任務
請提供 R 程式碼，使用 \`ggplot2\` 繪製一張專業的森林圖。

# 程式碼與結果要求
1.  **建立資料框：** 首先，請建立一個包含研究名稱 (study)、勝算比 (OR)、信賴區間下限 (lower)、和信賴區間上限 (upper) 的 data.frame。
2.  **繪製森林圖：**
    -   使用 \`geom_point()\` 顯示點估計 (OR)。
    -   使用 \`geom_errorbarh()\` 繪製水平的信賴區間。
    -   加上一條位於 x=1 的垂直參考線，代表無效線 (\`geom_vline(xintercept = 1, linetype = "dashed")\`)。
    -   使用 \`scale_x_log10()\` 使 X 軸呈現對數尺度，這在呈現 OR 或 RR 時是標準做法。
    -   使用學術風格主題，並附上清晰標題。`
  },
  {
    id: 14,
    title: '曼哈頓圖 (Manhattan Plot) 繪製',
    difficulty: '3. 進階應用',
    category: '多變量繪圖',
    uses: 190,
    likes: 120,
    description: '用於全基因組關聯分析 (GWAS) 或高維度數據探索，視覺化呈現大量 p-value 的分佈。',
    tags: ['R 語言', '曼哈頓圖', 'GWAS', 'qqman'],
    isFavorite: false,
    usageContext: '在進行全基因組關聯分析 (GWAS) 或現象級關聯分析 (PheWAS) 後，您會得到數以萬計的 p-value，曼哈頓圖是呈現這些結果並快速定位顯著信號的標準視覺化方法。',
    usageInstructions: '請安裝 \`qqman\` 套件。您的資料框需要包含至少三欄：**染色體 (CHR)**、**鹼基對位置 (BP)** 和 **p-value (P)**。將此資料框傳入 \`manhattan()\` 函數即可。',
    fullPrompt: `我完成了一項全基因組關聯分析 (GWAS)，現在需要使用 R 語言繪製一張曼哈頓圖 (Manhattan Plot) 來視覺化我的結果。

# 我的背景資訊
- **研究目的：** 呈現 GWAS 結果，快速找出在不同染色體上具有統計顯著性的單核苷酸多態性 (SNPs)。
- **資料集：** 我有一個名為 \`gwas_results\` 的 data.frame，包含以下欄位：
    - \`SNP\`: SNP 的識別碼
    - \`CHR\`: 染色體 (1-22)
    - \`BP\`: 染色體上的鹼基對位置
    - \`P\`: 關聯性檢定的 p-value

# 我的任務
請提供 R 程式碼，使用 \`qqman\` 套件來繪製一張曼哈頓圖。

# 程式碼與結果要求
1.  **載入套件：** 請確認已安裝並載入 \`qqman\` 套件。
2.  **建立範例數據：** 如果使用者沒有自己的數據，請先建立一個符合格式的模擬 \`gwas_results\` 資料框。
3.  **繪製曼哈頓圖：**
    -   使用 \`manhattan()\` 函數繪製圖表。
    -   在圖上自動標示出達到**全基因組顯著性** (genome-wide significance, 通常是 p < 5e-8) 的點。
    -   在圖上自動標示出達到**建議顯著性** (suggestive significance, 通常是 p < 1e-5) 的點。
    -   在程式碼註解中解釋圖表的 X 軸、Y 軸 (-log10(p-value)) 的意義。`
  },
  {
    id: 15,
    title: '地理數據描述性統計與直方圖',
    difficulty: '1. 入門必學',
    category: '描述性統計',
    uses: 550,
    likes: 210,
    description: '計算地理數據集的核心統計量，如平均值、標準差，並繪製直方圖以視覺化數據分佈。',
    tags: ['R 語言', '描述性統計', '地理數據', '直方圖', 'tidyverse'],
    isFavorite: true,
    essentialRank: null,
    usageContext: '在進行任何深入分析之前，了解數據的基本特性是至關重要的一步。此指令能幫助您快速掌握地理數據（如氣溫、降雨量）的集中趨勢、離散程度與分佈形狀。',
    usageInstructions: '請將程式碼中的 `data$Tem` 替換成您自己的**資料集**與**目標變數**。程式碼已包含計算平均值、中位數、標準差以及繪製直方圖的步驟。',
    fullPrompt: `我正在使用 R 語言對地理觀測數據進行初步的描述性統計分析。

# 我的背景資訊
- **研究目的：** 了解 2020 年中國各觀測站的年平均氣溫 ('Tem') 的基本分佈情況。
- **資料集：** 一個名為 \`climate2020.csv\` 的檔案，其中包含 'Tem' 欄位。

# 我的任務
請為我生成一段 R 程式碼，完成以下分析任務：
1. 使用 \`readr\` 套件讀取數據。
2. 計算 'Tem' 變數的平均值 (\`mean\`)、中位數 (\`median\`) 和標準差 (\`sd\`)。
3. 使用 \`ggplot2\` 繪製 'Tem' 變數的直方圖，以視覺化其分佈。
4. 在直方圖上疊加一條核密度估計曲線 (kernel density curve)，以更平滑地呈現分佈形狀。

# 程式碼與結果要求
- 請確保程式碼的整潔與可讀性，並附上中文註解解釋關鍵步驟。
- 最終應輸出統計數值與一張清晰的直方圖。`
  },
  {
    id: 16,
    title: '相關性分析與 corrplot 視覺化',
    difficulty: '2. 核心統計',
    category: '多變量繪圖',
    uses: 480,
    likes: 230,
    description: '計算多個地理變數之間的 Spearman 等級相關係數，並使用 corrplot 套件繪製相關性矩陣圖。',
    tags: ['R 語言', '相關性分析', 'corrplot', '地理數據', 'Spearman'],
    isFavorite: true,
    usageContext: '當您想探討多個地理變數（如海拔、氣溫、氣壓、降水）之間是否存在關聯，以及關聯性的強弱與方向時，相關性矩陣圖提供了清晰的全局視圖。',
    usageInstructions: '請準備一個包含您想分析的所有數值變數的資料框。程式碼將會計算所有變數配對的 Spearman 相關係數與 p-value，並視覺化呈現。',
    fullPrompt: `我正在研究多個地理變數之間的關係，需要進行相關性分析並將結果視覺化。

# 我的背景資訊
- **研究目的：** 探索海拔 ('Alt')、氣壓 ('Prs')、氣溫 ('Tem') 和降水量 ('Pre') 之間的相互關係。
- **數據：** 我的數據框中包含了以上四個數值變數。
- **分析方法：** 由於數據可能不符合常態分佈，我希望使用 Spearman 等級相關分析。

# 我的任務
請提供一段 R 程式碼，完成以下任務：
1.  使用 \`psych\` 或 \`Hmisc\` 套件計算 'Alt', 'Prs', 'Tem', 'Pre' 四個變數的 Spearman 相關係數矩陣及對應的 p-value 矩陣。
2.  使用 \`corrplot\` 套件將相關係數矩陣視覺化。
3.  在 \`corrplot\` 圖中：
    -   只顯示矩陣的上半部分 (\`type = "upper"\`)。
    -   根據相關性顯著性 (例如 p < 0.01) 標示出不顯著的相關係數 (\`insig = "blank"\`)。
    -   用顏色和圓圈大小表示相關性的強弱。

# 程式碼與結果要求
- 請附上載入必要套件的程式碼。
- 程式碼需包含清晰的中文註解。
- 最終生成一張專業且易於解讀的相關性矩陣圖。`
  },
  {
    id: 17,
    title: '簡單線性迴歸與模型診斷',
    difficulty: '2. 核心統計',
    category: '統計檢定',
    uses: 420,
    likes: 190,
    description: '建立簡單線性迴歸模型，分析變數關係，並產生殘差診斷圖以評估模型是否符合基本假設。',
    tags: ['R 語言', '線性迴歸', 'lm', '模型診斷', '地理數據'],
    isFavorite: false,
    usageContext: '當您想用一個變數（如海拔）來量化地預測另一個變數（如氣壓），並檢驗此預測模型的有效性時，此指令提供完整的分析流程。',
    usageInstructions: '在 \`lm()\` 的公式中，將 \`Prs ~ Alt\` 替換成您的**應變數**與**自變數**。\`plot(your_model_name)\` 會自動生成四張關鍵的模型診斷圖，幫助您評估殘差的正態性、線性、同方差性等。',
    fullPrompt: `我需要使用 R 語言建立一個簡單線性迴歸模型，並對模型進行診斷。

# 我的背景資訊
- **研究目的：** 探討海拔 ('Alt') 對氣壓 ('Prs') 的預測能力。
- **資料集：** 一個資料框，其中包含 'Alt' (自變數) 和 'Prs' (應變數) 兩個欄位。

# 我的任務
請提供 R 程式碼，完成以下分析流程：
1.  **建立模型：** 使用 \`lm()\` 函數建立 'Prs' 對 'Alt' 的簡單線性迴歸模型。
2.  **檢視模型摘要：** 使用 \`summary()\` 函數輸出模型結果，包括係數、R-squared 等。
3.  **模型診斷：** 使用 \`plot()\` 函數直接作用於模型物件上，生成一套四合一的診斷圖 (Residuals vs Fitted, Normal Q-Q, Scale-Location, Residuals vs Leverage)。
4.  **視覺化結果：** 繪製原始數據的散佈圖，並疊加上擬合出的迴歸線。

# 程式碼與結果要求
- 請在程式碼中附上清晰的中文註解，解釋模型結果和診斷圖的意義。
- 最終應呈現模型摘要、一張診斷圖和一張帶有迴歸線的散佈圖。`
  },
  {
    id: 18,
    title: '地理加權迴歸 (GWR) 分析',
    difficulty: '3. 進階應用',
    category: '統計檢定',
    uses: 210,
    likes: 155,
    description: '執行地理加權迴歸 (GWR)，探討變數關係在空間上的變異性，並將迴歸係數繪製成地圖。',
    tags: ['R 語言', 'GWR', '空間統計', 'spgwr', '地理數據'],
    isFavorite: false,
    usageContext: '當您懷疑變數之間的關係（如氣溫對降雨的影響）並非在所有地區都一樣時，GWR 能幫助您捕捉這種空間異質性，提供比傳統全域迴歸更深入的洞見。',
    usageInstructions: '請先準備好您的 \`sf\` 或 \`sp\` 空間點資料物件。將 \`formula_gwr\` 中的變數替換成您的應變數與自變數。程式碼將自動計算最佳帶寬 (bandwidth) 並執行 GWR 分析。',
    fullPrompt: `我正在進行一項空間數據分析，懷疑自變數與應變數之間的關係會隨著地理位置的不同而改變。

# 我的背景資訊
- **研究目的：** 分析氣溫 ('Tem') 和氣壓 ('Prs') 對降水量 ('Pre') 的影響是否在空間上存在異質性。
- **資料集：** 一個名為 \`mtpoints_albers_sp\` 的 \`sp\` 空間點物件，其中包含 'Pre', 'Tem', 'Prs' 欄位。

# 我的任務
請提供 R 程式碼，使用 \`spgwr\` 套件執行地理加權迴歸 (Geographically Weighted Regression, GWR)。

# 程式碼與結果要求
1.  **計算最佳帶寬 (Bandwidth)：** 使用 \`gwr.sel()\` 函數，透過交叉驗證 (cross-validation) 的方法找到最佳的帶寬。
2.  **執行 GWR：** 使用 \`gwr()\` 函數，代入上一步找到的帶寬來擬合 GWR 模型。
3.  **檢視結果：** 印出 GWR 模型的摘要，觀察係數的變異範圍。
4.  **結果視覺化 (選做)：** 提供將 GWR 模型結果中的局部迴歸係數 (例如 'Tem' 的係數) 繪製在地圖上的範例程式碼。

# 程式碼與結果要求
- 請附上載入必要套件的程式碼。
- 程式碼需包含清晰的中文註解，解釋 GWR 的關鍵步驟。`
  },
  {
    id: 19,
    title: 'k-Means 分群與地圖視覺化',
    difficulty: '2. 核心統計',
    category: '多變量繪圖',
    uses: 380,
    likes: 170,
    description: '對地理觀測站點進行 k-Means 分群，並將分群結果繪製於地圖上，以識別空間上的群集模式。',
    tags: ['R 語言', 'k-Means', '分群', 'cluster', 'ggplot2'],
    isFavorite: false,
    usageContext: '當您想根據多個特徵（如海拔與溫度）將觀測點進行分類，並觀察這些類別在地理空間上的分佈時，此指令非常有用，例如用於劃分氣候區。',
    usageInstructions: '在進行分群前，請務必對變數進行標準化，以避免不同單位的變數影響結果。在 \`kmeans()\` 中設定您期望的群數 \`centers\`。最後的地圖繪製需要資料包含經緯度欄位。',
    fullPrompt: `我希望根據多個地理特徵對觀測站點進行分類，並在地圖上呈現分類結果。

# 我的背景資訊
- **研究目的：** 根據標準化後的海拔 ('Alt') 和氣溫 ('Tem') 對氣象站點進行 k-Means 分群，以識別不同的氣候區域。
- **資料集：** 一個資料框，其中包含 'Alt', 'Tem', 以及地理座標 'Lon' 和 'Lat'。

# 我的任務
請提供 R 程式碼，完成以下分析與視覺化流程：
1.  **資料標準化：** 對 'Alt' 和 'Tem' 兩個變數進行標準化 (scaling)，使其平均值為0，標準差為1。
2.  **執行 k-Means 分群：** 使用 \`kmeans()\` 函數，將標準化後的數據分為 10 個群集。
3.  **將分群結果合併：** 將分群結果合併回原始的資料框。
4.  **地圖視覺化：** 使用 \`ggplot2\` 繪製一張地圖，在地圖上用不同顏色標示出屬於不同群集的站點。

# 程式碼與結果要求
- 請附上載入必要套件的程式碼。
- 程式碼需包含清晰的中文註解。
- 最終生成一張能清晰展示各群集空間分佈的地圖。`
  },
  {
    id: 20,
    title: '主成分分析 (PCA) 與碎石圖',
    difficulty: '3. 進階應用',
    category: '多變量繪圖',
    uses: 310,
    likes: 185,
    description: '對高維度地理數據進行主成分分析以達到降維目的，並視覺化主成分的碎石圖以決定保留的主成分數量。',
    tags: ['R 語言', 'PCA', '主成分分析', '降維', 'prcomp'],
    isFavorite: false,
    usageContext: '當您的數據包含多個高度相關的變數時，PCA 可以幫助您抽取出能解釋大部分變異的幾個關鍵主成分，簡化後續的分析（如分群或迴歸），同時避免多重共線性的問題。',
    usageInstructions: '請將您要進行 PCA 的數值變數資料傳入 \`prcomp()\` 函數，並記得設定 \`scale. = TRUE\` 進行標準化，這非常重要。',
    fullPrompt: `我的數據集包含多個相關的地理變數，我想使用主成分分析 (PCA) 來降維。

# 我的背景資訊
- **研究目的：** 將 'Alt', 'Prs', 'Tem', 'Pre' 四個相關變數降維，抽取出能解釋大部分數據變異的主成分。
- **資料集：** 一個資料框，其中包含以上四個數值變數。

# 我的任務
請提供 R 程式碼，執行主成分分析 (PCA) 並視覺化結果。

# 程式碼與結果要求
1.  **執行 PCA：** 使用 \`prcomp()\` 函數對數據進行 PCA。請務必在函數中設定 \`scale. = TRUE\` 來對變數進行標準化。
2.  **檢視 PCA 結果：** 使用 \`summary()\` 函數查看每個主成分的重要性，包括其解釋的變異比例和累積變異比例。
3.  **繪製碎石圖 (Scree Plot)：** 使用 \`screeplot()\` 函數視覺化每個主成分的變異數（特徵值），以幫助決定要保留多少個主成分。
4.  在註解中說明如何根據碎石圖的 "肘部" (elbow) 來判斷主成分的數量。

# 程式碼與結果要求
- 請附上清晰的中文註解，解釋 PCA 的步驟與結果判讀。`
  },
  {
    id: 21,
    title: '時間序列分析：ARIMA 模型擬合與預測',
    difficulty: '3. 進階應用',
    category: '時間序列分析',
    uses: 350,
    likes: 180,
    description: '自動分解時間序列資料，使用 auto.arima() 擬合最適當的模型，並繪製未來預測圖。',
    tags: ['R 語言', '時間序列', 'ARIMA', 'forecast', '預測'],
    isFavorite: false,
    usageContext: '當您需要分析具時間性的數據（如股價、銷售額、臨床監測指標），找出其內在模式並對未來進行預測時，ARIMA 模型是經典且強大的工具。',
    usageInstructions: '請將 `AirPassengers` 替換成您自己的時間序列物件（`ts` object）。您可以在 `forecast()` 函數中調整 `h` 參數來設定預測的期數。',
    fullPrompt: `我正在分析一段時間序列數據，希望能找出其內在規律並對未來進行預測。

# 我的背景資訊
- **研究目的：** 建立一個 ARIMA 模型來預測未來的航空旅客人數。
- **資料集：** 使用 R 內建的 \`AirPassengers\` 時間序列資料。

# 我的任務
請提供 R 程式碼，使用 \`forecast\` 套件完成以下時間序列分析流程：
1.  **模型自動選擇：** 使用 \`auto.arima()\` 函數，讓 R 自動找出最適合此數據的 ARIMA(p,d,q) 模型。
2.  **模型摘要：** 顯示 \`auto.arima()\` 所選擇模型的詳細資訊。
3.  **預測未來：** 使用 \`forecast()\` 函數，預測未來 24 個月 (2年) 的數值。
4.  **結果視覺化：** 使用 \`autoplot()\` 函數（或 \`plot()\`），繪製歷史數據、預測值，以及 80% 和 95% 的預測區間。

# 程式碼與結果要求
- 請載入 \`forecast\` 和 \`ggplot2\` 套件。
- 在程式碼中附上清晰的中文註解，解釋各步驟的功能。
- 最終圖表應清晰地呈現預測趨勢與不確定性區間。`
  },
  {
    id: 22,
    title: '投資組合優化：效率前緣計算與繪圖',
    difficulty: '3. 進階應用',
    category: '金融計算',
    uses: 280,
    likes: 160,
    description: '根據多個資產的歷史報酬率，計算並繪製馬可維茲效率前緣，找出最佳風險報酬組合。',
    tags: ['R 語言', '投資組合', '效率前緣', 'PortfolioAnalytics', '金融'],
    isFavorite: false,
    usageContext: '在建立投資組合時，為了在給定的風險水準下最大化預期報酬，或在給定的報酬水準下最小化風險，計算效率前緣是資產配置的關鍵步驟。',
    usageInstructions: '請準備一個包含多個資產日報酬率的資料框或 `xts` 物件。程式碼將以此為基礎，透過模擬大量隨機權重，繪製出效率前緣的可能範圍。',
    fullPrompt: `我正在學習 Markowitz 的現代投資組合理論，需要使用 R 語言繪製效率前緣 (Efficient Frontier)。

# 我的背景資訊
- **研究目的：** 視覺化呈現由多個資產構成的投資組合中，風險與報酬之間的權衡關係。
- **資料集：** 假設我有一個名為 \`returns_data\` 的物件，其中包含數個資產的歷史報酬率。

# 我的任務
請提供 R 程式碼，完成以下任務：
1. **資料準備：** 建立一個包含 3 個資產隨機報酬率的範例資料框。計算其平均報酬率向量和共變異數矩陣。
2. **計算效率前緣：** 透過迴圈，模擬大量的隨機投資組合權重，並計算每個組合的預期報酬率與標準差（風險）。
3. **結果視覺化：** 使用 \`ggplot2\` 繪製散佈圖，呈現所有模擬出的投資組合，形成效率前緣的雲圖。

# 程式碼與結果要求
- 程式碼需有中文註解，解釋關鍵步驟。
- 最終圖表應清晰地展示由隨機權重構成的投資組合在風險-報酬平面上的分佈。`
  },
  {
    id: 23,
    title: '風險管理：計算投資組合的風險價值 (VaR)',
    difficulty: '2. 核心統計',
    category: '風險管理',
    uses: 450,
    likes: 200,
    description: '使用歷史模擬法、參數法等計算投資組合在特定信賴水準下的預期最大損失 (Value at Risk)。',
    tags: ['R 語言', 'VaR', '風險管理', 'PerformanceAnalytics', '金融'],
    isFavorite: false,
    usageContext: 'VaR 是金融業衡量市場風險的核心指標，用於估計投資組合在未來特定時間內、在特定機率下可能面臨的最大潛在損失。',
    usageInstructions: '請準備一個包含您投資組合歷史報酬率的 `xts` 或數值向量。您可以在 `VaR()` 函數中修改 `p` 來設定信賴水準（例如 `p=0.95` 代表 95% 信賴水準），並透過 `method` 參數選擇計算方法。',
    fullPrompt: `我是一名金融風險管理師，需要使用 R 語言計算投資組合的風險價值 (Value at Risk, VaR)。

# 我的背景資訊
- **研究目的：** 評估一個投資組合在未來特定期間內，於 95% 的信賴水準下，可能面臨的最大損失。
- **資料集：** 使用 \`PerformanceAnalytics\` 套件中內建的 \`edhec\` 數據集的 'Convertible Arbitrage' 指數作為範例報酬率序列。

# 我的任務
請提供 R 程式碼，使用 \`PerformanceAnalytics\` 套件計算 VaR。

# 程式碼與結果要求
1.  **載入套件與資料。**
2.  **計算 VaR：** 使用 \`VaR()\` 函數，分別透過以下三種方法計算 95% VaR (對應 \`p=0.95\`)：
    -   高斯分佈法 (Parametric Gaussian)。
    -   修正後的 VaR (Modified, Cornish-Fisher expansion)。
    -   歷史模擬法 (Historical Simulation)。
3.  **呈現結果：** 將三種方法計算出的 VaR 結果清楚地印出，並在註解中解釋其數值的意義（例如，VaR 為 0.02 代表什麼）。`
  },
  {
    id: 24,
    title: '蒙地卡羅模擬：歐式選擇權定價',
    difficulty: '3. 進階應用',
    category: '蒙地卡羅模擬',
    uses: 190,
    likes: 110,
    description: '使用蒙地卡羅方法，模擬股價的幾何布朗運動路徑，以估算歐式選擇權的理論價格。',
    tags: ['R 語言', '蒙地卡羅', '選擇權定價', '金融工程', '模擬'],
    isFavorite: false,
    usageContext: '對於某些難以找到解析解的衍生性金融商品，蒙地卡羅模擬是一種強大且靈活的數值定價方法。',
    usageInstructions: '請在程式碼開頭的參數區塊中，設定您要評價的選擇權參數，包括：標的物現價 (`S0`)、履約價 (`K`)、無風險利率 (`r`)、波動率 (`sigma`)、到期時間 (`T`)，以及模擬路徑數 (`N`)。',
    fullPrompt: `我正在學習金融工程，需要使用 R 語言透過蒙地卡羅模擬 (Monte Carlo Simulation) 來為一個歐式買權 (European Call Option) 定價。

# 我的背景資訊
- **定價目標：** 估算一個歐式買權的理論價格。
- **核心假設：** 股價遵循幾何布朗運動 (Geometric Brownian Motion, GBM)。

# 我的任務
請提供一段 R 程式碼，完成以下模擬定價流程：
1.  **設定參數：** 定義選擇權的各項參數，包含：
    -   標的物現價 (S0): 100
    -   履約價 (K): 105
    -   無風險利率 (r): 0.05 (5%)
    -   波動率 (sigma): 0.2 (20%)
    -   到期時間 (T): 1 年
    -   模擬路徑數 (N): 100,000
2.  **模擬期末股價：** 根據 GBM 的公式，模擬 N 次到期時的股價 (ST)。
3.  **計算期末收益 (Payoff)：** 對於每次模擬的股價，計算買權的收益，即 \`max(0, ST - K)\`。
4.  **折現並計算平均值：** 將所有模擬路徑的平均收益，用無風險利率折現回現值，即為選擇權的估計價格。

# 程式碼與結果要求
- 請在程式碼中附上清晰的中文註解，解釋 GBM 股價模擬公式與定價邏輯。
- 最終印出蒙地卡羅模擬所得出的選擇權價格。`
  },
  {
    id: 25,
    title: '資本資產定價模型 (CAPM) 分析',
    difficulty: '2. 核心統計',
    category: '金融計算',
    uses: 520,
    likes: 240,
    description: '執行迴歸分析以估計資產的 Alpha 和 Beta 值，評估其系統風險與超額報酬。',
    tags: ['R 語言', 'CAPM', 'Alpha', 'Beta', '迴歸', '金融'],
    isFavorite: true,
    essentialRank: 5,
    usageContext: 'CAPM 是現代投資組合理論的基石，用於衡量一項投資的預期報酬是否與其承擔的系統風險相匹配。Alpha 可視為經風險調整後的超額報酬，Beta 則是衡量其相對於市場波動的敏感度。',
    usageInstructions: '請準備兩個時間對齊的報酬率序列：一個是您的**資產報酬率**，另一個是**市場指數報酬率**，以及一個**無風險利率**序列。程式碼將自動計算超額報酬並執行迴歸。',
    fullPrompt: `我需要對一檔股票進行資本資產定價模型 (CAPM) 分析，以評估其系統風險與超額報酬。

# 我的背景資訊
- **研究目的：** 估計股票相對於市場的 Beta 值，以及其 Alpha 值。
- **資料集：** 假設我有兩組時間對齊的報酬率數據：
    - \`asset_returns\`: 某支股票的日報酬率
    - \`market_returns\`: 市場指數 (如 S&P 500) 的日報酬率
    - \`risk_free_rate\`: 無風險利率 (日度)

# 我的任務
請提供 R 程式碼，完成 CAPM 的迴歸分析流程：
1.  **資料準備：** 建立模擬的資產、市場報酬率與無風險利率數據。
2.  **計算超額報酬：** 分別計算資產與市場的超額報酬率 (減去無風險利率)。
3.  **執行迴歸分析：** 使用 \`lm()\` 函數，以市場的超額報酬為自變數，資產的超額報酬為應變數，建立線性模型。
4.  **檢視與解讀結果：** 使用 \`summary()\` 顯示模型結果，並在註解中清楚解釋：
    -   截距 (Intercept) 即為 Alpha (α)。
    -   斜率係數 (Slope) 即為 Beta (β)。
    -   Alpha 的 p-value 代表的意義（是否具有顯著的超額報酬）。
    -   Beta 的 p-value 代表的意義（是否與市場存在顯著的系統性關聯）。

# 程式碼與結果要求
- 程式碼應結構清晰，並有完整的中文註解。`
  },
  {
    id: 26,
    title: '因果中介分析 (模擬法)',
    difficulty: '3. 進階應用',
    category: '因果推論',
    uses: 480,
    likes: 290,
    description: '使用 Imai 等人開發的模擬法，估計平均因果中介效應 (ACME) 與平均直接效應 (ADE)，並評估其不確定性。',
    tags: ['R 語言', '因果中介', 'CMA', 'mediation', '模擬法', 'ACME', 'ADE'],
    isFavorite: true,
    essentialRank: null,
    usageContext: '當您想量化一個變數 (X) 如何透過一個中介變數 (M) 影響結果 (Y) 時，因果中介分析是標準方法。此指令適用於符合因果假定的觀察性或實驗性研究。',
    usageInstructions: '請安裝並載入 `mediation` 套件。您需要分別建立中介變數模型 (mediator model) 和結果變數模型 (outcome model)，然後將它們傳入 `mediate()` 函數。請將 `treat` 參數設為您的**處理變數**名稱，`mediator` 參數設為您的**中介變數**名稱。',
    fullPrompt: `我正在進行一項社會科學研究，需要探討家庭背景如何透過教育程度影響個人收入，並希望使用因果中介分析來量化此過程。

# 我的背景資訊
- **研究目的：** 估計父母教育程度 (處理變數) 對子女收入 (結果變數) 的直接效應，以及透過子女自身教育程度 (中介變數) 產生的間接效應。
- **資料集：** 假設有一個名為 \`my_data\` 的資料框，包含以下變數：
    - \`parent_edu\`: 父母教育程度 (二元變數, 1=高, 0=低)。
    - \`child_edu\`: 子女受教育年限 (連續變數)。
    - \`child_income\`: 子女成年後收入 (連續變數)。
    - \`covariates\`: 其他需要控制的共變數。

# 我的任務
請提供 R 程式碼，使用 \`mediation\` 套件執行基於模擬的因果中介分析。

# 程式碼與結果要求
1.  **建立模型：**
    -   建立一個中介模型 (mediator model)，公式為 \`child_edu ~ parent_edu + covariates\`。
    -   建立一個結果模型 (outcome model)，公式為 \`child_income ~ parent_edu + child_edu + covariates\`。
2.  **執行中介分析：** 使用 \`mediate()\` 函數，傳入上述兩個模型，並設定處理變數 (\`treat\`) 與中介變數 (\`mediator\`)。
3.  **檢視結果：** 使用 \`summary()\` 函數顯示分析結果。
4.  **解讀結果：** 在註解中簡要說明如何解讀以下幾個關鍵指標：
    -   ACME (Average Causal Mediation Effect): 平均因果中介效應，即間接效應。
    -   ADE (Average Direct Effect): 平均直接效應。
    -   Total Effect: 總效應。
    -   Prop. Mediated: 中介效應佔總效應的比例。`
  },
  {
    id: 27,
    title: '彈性中介分析 (自然效應模型)',
    difficulty: '3. 進階應用',
    category: '因果推論',
    uses: 350,
    likes: 195,
    description: '使用基於自然效應模型的加權法或插補法，彈性地估計自然直接效應 (NDE) 與自然間接效應 (NIE)。',
    tags: ['R 語言', '因果中介', 'medflex', '自然效應模型', '加權法', '插補法', 'NDE', 'NIE'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '當傳統線性模型假設過強，或您想使用更穩健的方法來估計直接與間接效應時，`medflex` 套件提供了基於資料擴增與加權/插補的彈性框架。',
    usageInstructions: '請安裝 `medflex` 套件。首先使用 `neWeight()` (加權法) 或 `neImpute()` (插補法) 擴增您的資料集，然後將擴增後的資料傳入 `neModel()` 進行自然效應模型擬合。',
    fullPrompt: `我正在研究一個複雜的中介過程，傳統的迴歸方法可能不適用，我希望使用一個更具彈性的方法來估計自然直接與間接效應。

# 我的背景資訊
- **研究問題：** 探討父母教育程度 (\`eduparentmeanbi\`) 對子女收入 (\`lninc_30\`) 的影響中，有多少是直接的，有多少是透過子女教育程度 (\`edu\`) 中介的。
- **資料集：** 假設有一個名為 \`my_data\` 的資料框，包含上述變數及其他共變數。

# 我的任務
請提供 R 程式碼，演示如何使用 \`medflex\` 套件中的**加權法 (weighting)** 來估計自然直接效應 (NDE) 和自然間接效應 (NIE)。

# 程式碼與結果要求
1.  **資料擴增：** 使用 \`neWeight()\` 函數，基於中介變數模型 (\`edu ~ ...\`) 來擴增原始資料集。
2.  **擬合自然效應模型：** 使用 \`neModel()\` 函數，在擴增後的資料集上擬合結果模型。此模型的公式結構特殊，通常為 \`outcome ~ treatment0 + treatment1 + ...\` 的形式。
3.  **分解效應：** 使用 \`neEffdecomp()\` 函數從擬合的模型中分解出 NDE 和 NIE。
4.  **解讀結果：** 在註解中說明 \`neModel\` 和 \`neEffdecomp\` 的輸出結果。`
  },
  {
    id: 28,
    title: '序列中介分析 (路徑特定效應)',
    difficulty: '3. 進階應用',
    category: '因果推論',
    uses: 280,
    likes: 180,
    description: '分析具有兩個或以上序列中介變數的複雜因果鏈 (X -> M1 -> M2 -> Y)，並分解出特定路徑的間接效應。',
    tags: ['R 語言', '序列中介', '多重中介', 'paths', '路徑分析', 'Sequential Mediation'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '當您的理論模型包含一個有先後順序的因果鏈時（例如：家庭背景 -> 教育 -> 收入 -> 健康），序列中介分析可以幫助您拆解每個環節的具體貢獻。',
    usageInstructions: '請安裝 `paths` 套件。您需要定義一個包含所有模型的 `glm` 物件列表，然後將此列表傳入 `paths()` 函數。在 `paths()` 中，透過 `mediators` 參數指定中介變數的序列。',
    fullPrompt: `我的研究模型涉及一個包含兩個序列中介變數的因果鏈，我需要估計每個特定路徑的效應。

# 我的背景資訊
- **研究模型：** 父母教育 (\`A\`) -> 子女教育 (\`M1\`) -> 子女收入 (\`M2\`) -> 子女健康 (\`Y\`)。
- **資料集：** 一個包含 A, M1, M2, Y 及共變數的資料框。

# 我的任務
請提供 R 程式碼，使用 \`paths\` 套件執行序列中介分析，並估計以下路徑特定效應：
1.  A 的總直接效應 (A -> Y)。
2.  透過 M1 的間接效應 (A -> M1 -> Y)。
3.  透過 M2 的間接效應 (A -> M2 -> Y)。
4.  透過 M1 再到 M2 的序列間接效應 (A -> M1 -> M2 -> Y)。

# 程式碼與結果要求
1.  **定義模型：** 分別為 M1, M2, 和 Y 建立 \`glm\` 模型。
2.  **執行分析：** 將所有模型物件放入一個列表中，傳給 \`paths()\` 函數。在函數中指定處理變數、結果變數和中介變數序列。
3.  **檢視結果：** 使用 \`summary()\` 檢視分解出的各路徑效應。
4.  **視覺化：** 使用 \`plot()\` 函數將路徑效應視覺化。
- 請附上清晰的中文註解。`
  },
  {
    id: 29,
    title: '中介分析的敏感度分析',
    difficulty: '3. 進階應用',
    category: '因果推論',
    uses: 220,
    likes: 165,
    description: '評估潛在的「中介-結果」混淆變數 (M-Y confounder) 對中介分析結果的影響程度，檢驗研究結論的穩健性。',
    tags: ['R 語言', '敏感度分析', '因果推論', '未觀察混淆', 'robustness', 'mediationsens'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '因果中介分析的一個核心假設是「不存在未觀察到的中介-結果混淆變數」。敏感度分析是一種事後診斷，用於回答：「這個假設需要被多嚴重地違反，才會改變我的研究結論？」',
    usageInstructions: '請安裝 `mediationsens` 套件。將您在 `mediate()` 中的模型傳入 `medsens()` 函數，它會計算需要多強的混淆才能使間接效應變為零。',
    fullPrompt: `我已經完成了一項因果中介分析，但擔心可能存在未觀察到的混淆變數同時影響中介變數 (M) 和結果變數 (Y)。

# 我的背景資訊
- **研究模型：** 已使用 \`mediation\` 套件完成了 \`A -> M -> Y\` 的分析，並得到了顯著的間接效應。
- **擔憂：** 存在一個未觀察的混淆因子 U，它同時影響 M 和 Y。

# 我的任務
請提供 R 程式碼，使用 \`mediationsens\` 套件對我之前的中介分析結果進行敏感度分析。

# 程式碼與結果要求
1.  **執行敏感度分析：** 將 \`mediate()\` 的輸出物件傳入 \`medsens()\` 函數。
2.  **檢視結果：** 使用 \`summary()\` 顯示敏感度分析結果。
3.  **解讀結果：** 在註解中說明如何解讀敏感度參數 ρ (rho) 和 R-squared 值。
    -   ρ: M 和 Y 的殘差之間的相關性。
    -   ACME 為 0 時的 ρ 值是多少？
    -   ACME 的信賴區間包含 0 時的 ρ 值是多少？
4.  **視覺化：** 使用 \`plot()\` 函數將敏感度分析結果視覺化，呈現間接效應如何隨著 ρ 值的變化而變化。`
  },
  {
    id: 30,
    title: '中介分析的干預效應',
    difficulty: '3. 進階應用',
    category: '因果推論',
    uses: 180,
    likes: 140,
    description: '估計干預直接效應 (IDE) 與干預間接效應 (IIE)，此方法放寬了自然效應模型所需的「跨世界獨立性」假設，更適用於政策評估情境。',
    tags: ['R 語言', '因果中介', '干預效應', 'intmed', '政策評估'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '當您關心的問題是「如果我們干預中介變數，將其設定為某個分佈，對結果會有什麼影響？」時，干預效應比自然效應更貼近實際的政策模擬情境。',
    usageInstructions: '請安裝 `intmed` 套件。您需要定義結果變數 (y)、中介變數 (med)、處理變數 (treat) 和共變數 (c)，並指定它們的模型類型（例如 "regression"）。',
    fullPrompt: `我正在進行一項政策評估研究，需要估計一種干預措施的直接與間接效果，並且我認為「自然效應」的假設可能太強。

# 我的背景資訊
- **研究情境：** 評估一項教育政策 (\`treat\`) 對學生未來收入 (\`y\`) 的影響，其中學生的學習動機 (\`med\`) 是一個中介。
- **分析方法：** 我希望使用干預效應 (Interventional Effects) 框架來分解總效應。

# 我的任務
請提供 R 程式碼，使用 \`intmed\` 套件估計干預直接效應 (IDE) 和干預間接效應 (IIE)。

# 程式碼與結果要求
1.  **執行分析：** 使用 \`mediate()\` 函數 (注意，這裡的 \`mediate\` 是 \`intmed\` 套件中的)，並輸入所有必要的參數，包括變數名稱和模型類型。
2.  **檢視結果：** 直接印出 \`mediate()\` 的結果物件。
3.  **解讀結果：** 在註解中解釋輸出的 IDE, IIE, Total Effect 和 Proportion of effect mediated 的意義。
4.  特別說明為何在干預效應框架下，IDE + IIE 不一定等於 Total Effect。`
  },
  {
    id: 31,
    title: 'SIR 流行病學模型模擬與視覺化',
    difficulty: '2. 核心統計',
    category: '流行病學模型',
    uses: 500,
    likes: 250,
    description: '使用 `deSolve` 套件模擬經典的 SIR (易感-感染-康復) 流行病學模型，並繪製各倉室隨時間變化的曲線。',
    tags: ['R 語言', 'SIR 模型', 'deSolve', '流行病學', '微分方程'],
    isFavorite: true,
    essentialRank: null,
    usageContext: '當您需要模擬一個傳染病在封閉群體中的傳播過程，以了解疫情高峰、規模等基本動態時，SIR 模型是最經典的入門工具。',
    usageInstructions: '請在 `# 參數設定` 區塊中，根據您的研究情境調整 `beta` (傳播率)、`gamma` (康復率) 等參數，以及 `init` 中的初始 S, I, R 人口比例。',
    fullPrompt: `我是一名公共衛生領域的研究生，需要使用 R 語言模擬一個基本的傳染病模型。

# 我的背景資訊
- **研究目的：** 了解一個類流感疾病在一個固定人口中的傳播動態。
- **模型：** 我想使用經典的 SIR (Susceptible-Infected-Removed) 常微分方程 (ODE) 模型。

# 我的任務
請提供一段 R 程式碼，完成以下任務：
1.  **定義 SIR 模型：** 撰寫一個包含 dS/dt, dI/dt, dR/dt 方程式的 R 函數。
2.  **設定參數：** 設定模型的參數，包括傳播率 (beta)、康復率 (gamma) 和初始族群狀態 (S, I, R 的初始值)。
3.  **數值求解：** 使用 \`deSolve\` 套件的 \`ode()\` 函數來求解這個 ODE 系統。
4.  **結果視覺化：** 使用 \`ggplot2\` 或 R base graphics 繪製 S, I, R 三個倉室的人數隨時間變化的曲線圖。

# 程式碼與結果要求
- 請載入 \`deSolve\` 套件。
- 程式碼需有清晰的中文註解，解釋 SIR 模型的三個方程式與參數意義。
- 最終圖表應清楚呈現疫情的發展過程。`
  },
    {
    id: 32,
    title: '從初期疫情數據估計 R0 (基本再生數)',
    difficulty: '2. 核心統計',
    category: '流行病學模型',
    uses: 620,
    likes: 310,
    description: '在疫情爆發初期，利用累積病例數的指數增長趨勢，透過線性迴歸快速估計基本再生數 R0。',
    tags: ['R 語言', 'R0', '流行病學', '指數增長', '線性迴歸'],
    isFavorite: true,
    essentialRank: null,
    usageContext: '在應對新發傳染病（如 COVID-19、流感大流行）的初期，快速評估其傳播潛力 (R0) 對於公共衛生決策至關重要。此方法提供了一種基於早期數據的簡易估算方式。',
    usageInstructions: '請準備一個包含**時間**（例如：天、週）和**累積病例數**的資料框。將 `your_data`, `time_variable`, `cumulative_cases_variable` 替換成您的實際變數。記得根據您研究的疾病，設定合理的**序列間隔 (serial_interval)**。',
    fullPrompt: `我正在分析一個新發傳染病的早期數據，需要快速估計其基本再生數 R0。

# 我的背景資訊
- **研究目的：** 利用疫情爆發前幾週的累積病例數，估算 R0。
- **核心假設：** 在疫情初期，由於易感人群充足，病例數呈指數增長。log(累積病例數) 與時間呈線性關係。
- **公式：** \`R0 ≈ 1 + r * V\`，其中 \`r\` 是指數增長率 (可從迴歸斜率得到)，\`V\` 是序列間隔 (serial interval)。

# 我的任務
請提供一段 R 程式碼，完成以下分析流程：
1.  **建立範例數據：** 建立一個模擬的每日累積病例數資料框。
2.  **擬合線性模型：** 對**對數轉換後**的累積病例數與時間進行線性迴歸 (\`lm(log(cumulative_cases) ~ time)\`)。
3.  **提取增長率：** 從模型中提取斜率，即為指數增長率 \`r\`。
4.  **計算 R0：** 假設序列間隔 \`V\` 為 4 天，使用公式計算 R0。

# 程式碼與結果要求
- 程式碼需有清晰的中文註解，解釋每一步驟的邏輯。
- 最終印出估算出的指數增長率 \`r\` 和基本再生數 R0。
- (選做) 繪製 log(累積病例數) 對時間的散佈圖與迴歸線，以視覺化確認線性關係。`
  },
  {
    id: 33,
    title: '鏈二項式模型 (Chain-Binomial) 擬合',
    difficulty: '3. 進階應用',
    category: '流行病學模型',
    uses: 280,
    likes: 170,
    description: '使用最大概似估計法，將離散時間的鏈二項式模型擬合至疫情數據，估計初始易感人數 (S0) 與傳播率 (β)。',
    tags: ['R 語言', '鏈二項式模型', '最大概似估計', 'bbmle', '流行病學'],
    isFavorite: false,
    usageContext: '相較於連續時間的 SIR 模型，鏈二項式模型是分析世代間傳播（例如流感在家庭內的傳播）或時間顆粒較粗的疫情數據（如雙週報）的經典隨機模型。',
    usageInstructions: '請準備好您的**疫情時間序列數據** (每期的新增病例數)。將 `your_data_vector` 替換成您的數據。您可能需要調整 `mle2` 中 `start` 參數的初始猜測值，以幫助模型收斂。',
    fullPrompt: `我需要使用 R 語言，將一個鏈二項式 (Chain-Binomial) 隨機模型擬合到我的疫情數據上。

# 我的背景資訊
- **研究目的：** 根據一段時間的病例數，估計疫情爆發時的初始易感人數 (S0) 和傳播率 (beta)。
- **模型假設：** 在每個時間單位（一個序列間隔），新的感染數遵循二項分佈 \`I_t+1 ~ Binomial(S_t, 1 - exp(-beta * I_t / N))\`。
- **分析方法：** 最大概似估計法 (Maximum Likelihood Estimation)。

# 我的任務
請提供 R 程式碼，使用 \`bbmle\` 套件完成以下任務：
1.  **定義負對數概似函數：** 撰寫一個 R 函數，該函數接收參數 (S0, beta) 和數據 (I)，並返回負對數概似值。
2.  **準備數據：** 建立一個範例的病例數向量。
3.  **執行最大概似估計：** 使用 \`bbmle::mle2()\` 函數，傳入概似函數、初始參數猜測值和數據，以找到最佳參數估計。
4.  **檢視結果：** 使用 \`summary()\` 檢視估計出的 S0 和 beta，以及它們的信賴區間。

# 程式碼與結果要求
- 請載入 \`bbmle\` 套件。
- 程式碼需有清晰的中文註解，解釋概似函數的建立與模型擬合過程。
- 最終輸出 S0 和 beta 的點估計與 95% 信賴區間。`
  },
  {
    id: 34,
    title: '從血清盛行率數據估計感染力 (FoI)',
    difficulty: '2. 核心統計',
    category: '流行病學模型',
    uses: 490,
    likes: 280,
    description: '使用催化模型 (Catalytic Model) 與廣義線性模型 (GLM)，從分年齡的血清盛行率數據中，估計恆定的年齡感染力 (Force of Infection, FoI)。',
    tags: ['R 語言', '催化模型', '血清盛行率', 'FoI', 'glm', '臨床統計'],
    isFavorite: true,
    essentialRank: null,
    usageContext: '血清學調查是了解一個族群對特定病原體累積暴露情況的重要方法。催化模型能將橫斷面的年齡血清陽性率數據，轉換為對病原體傳播強度的動態估計 (FoI)。',
    usageInstructions: '請準備一個包含**年齡** (`age`)、**陽性人數** (`positive`) 和**總檢測人數** (`total`) 的資料框。將 `your_data` 替換成您的資料。`offset(log(age))` 是此模型的關鍵，請勿修改。',
    fullPrompt: `我有一份分年齡的血清盛行率 (age-seroprevalence) 調查數據，希望使用 R 語言的催化模型 (Catalytic Model) 來估計該疾病的感染力 (Force of Infection, FoI)。

# 我的背景資訊
- **研究目的：** 從橫斷面數據中，估計一個恆定的年齡感染力 (age-invariant FoI, φ)。
- **模型假設：** 某年齡 \`a\` 的血清陽性率 \`p(a)\` 滿足 \`p(a) = 1 - exp(-φ * a)\`。此公式可以轉換為 \`log(-log(1 - p(a))) = log(φ) + log(a)\`。
- **分析方法：** 這可以被看作是一個廣義線性模型 (GLM)，其中應變數是陽性與陰性人數，連結函數是互補雙對數 (complementary log-log, "cloglog")，並將 \`log(age)\` 作為一個 offset (係數固定為1的項)。

# 我的任務
請提供 R 程式碼，完成以下分析流程：
1.  **建立範例數據：** 建立一個包含年齡 ('age')、陽性人數 ('pos')、總人數 ('n') 的資料框。
2.  **擬合 GLM 模型：** 使用 \`glm()\` 函數，設定 \`family = binomial(link = "cloglog")\`，並在公式中包含 \`offset(log(age))\`。
3.  **提取 FoI：** 從模型截距 (Intercept) 中，透過取指數 (\`exp()\`) 來計算 FoI (φ)。
4.  **計算平均感染年齡：** 計算 1/φ，即為平均感染年齡。
5.  **視覺化：** 繪製觀測數據點與模型擬合出的盛行率曲線。

# 程式碼與結果要求
- 程式碼需有清晰的中文註解。
- 最終印出估計的 FoI 和平均感染年齡。`
  },
  {
    id: 35,
    title: '傳染病 SIR 模型參數敏感度分析',
    difficulty: '3. 進階應用',
    category: '流行病學模型',
    uses: 250,
    likes: 150,
    description: '使用 `FME` 套件對 SIR 模型的參數（如傳播率、康復率）進行敏感度分析，以了解哪些參數對疫情高峰或總規模影響最大。',
    tags: ['R 語言', '敏感度分析', 'SIR 模型', 'FME', '流行病學', '不確定性'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '在建立數學模型時，了解模型的預測結果對各個參數的敏感程度至關重要。這有助於識別哪些是影響模型的關鍵參數，指導未來的數據收集方向，並評估模型預測的不確定性。',
    usageInstructions: '請先安裝 `FME` 套件。您需要先定義好您的 SIR 模型函數（與 `deSolve` 格式相同）以及一個輸出您關心的指標（如疫情高峰）的函數。將這些傳入 `sensFun()` 函數即可。',
    fullPrompt: `我已經建立了一個 SIR 傳染病模型，現在我想評估模型的結果（例如疫情高峰值）對於不同參數（如傳播率 beta 和康復率 gamma）的敏感度。

# 我的背景資訊
- **研究目的：** 找出對 SIR 模型的預測結果影響最大的關鍵參數。
- **模型：** 標準的 SIR 模型。
- **分析方法：** 使用 \`FME\` 套件進行參數敏感度分析。

# 我的任務
請提供 R 程式碼，完成以下敏感度分析流程：
1.  **定義 SIR 模型：** 撰寫一個與 \`deSolve\` 相容的 SIR 模型函數。
2.  **設定參數與範圍：** 定義參數的基準值、最小值和最大值。
3.  **執行敏感度分析：** 使用 \`FME::sensFun()\` 函數，計算模型輸出（例如感染人數 I）對參數的敏感度。
4.  **視覺化結果：** 使用 \`plot()\` 函數繪製敏感度分析的結果，顯示每個時間點上，各個參數對感染人數的影響程度。
5.  **計算總體敏感度：** 使用 \`summary()\` 函數計算每個參數的總體敏感度指標 (L1-norm, L2-norm)。

# 程式碼與結果要求
- 請載入 \`deSolve\` 和 \`FME\` 套件。
- 程式碼需有清晰的中文註解，解釋敏感度分析的設定與結果解讀。
- 最終應呈現一張敏感度隨時間變化的圖表，以及總體敏感度摘要。`
  },
  {
    id: 36,
    title: '讀取 DICOM 影像並轉換為 NIfTI 格式',
    difficulty: '2. 核心統計',
    category: '臨床影像分析',
    uses: 150,
    likes: 75,
    description: '使用 `oro.dicom` 套件讀取整個 DICOM 資料夾，並利用 `oro.nifti` 將其轉換為標準化的 NIfTI 格式以利後續分析。',
    tags: ['R 語言', 'DICOM', 'NIfTI', 'oro.dicom', 'oro.nifti', '醫學影像'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '當您從 MRI 掃描儀獲得原始的 DICOM 格式影像時，第一步通常是將其轉換為學術界更通用的 NIfTI 格式，以便使用 FSL, ANTsR 等標準工具進行分析。',
    usageInstructions: '請將 `dicom_directory_path` 替換成您存放 DICOM 檔案的資料夾路徑。程式碼會自動讀取資料夾內所有 DICOM 檔案並進行轉換。',
    fullPrompt: `我正在處理一份來自 MRI 掃描的醫學影像資料，格式為 DICOM，我需要將其轉換為 NIfTI 格式以進行後續的神經影像分析。

# 我的背景資訊
- **研究目的：** 標準化影像資料格式，以利使用 FSL, SPM, ANTsR 等分析工具。
- **資料格式：** 原始資料儲存在一個資料夾中，內含數百個 .dcm 檔案。

# 我的任務
請提供一段 R 程式碼，完成以下流程：
1.  **載入套件：** 載入 \`oro.dicom\` 和 \`oro.nifti\` 套件。
2.  **讀取 DICOM：** 使用 \`readDICOM()\` 函數讀取指定資料夾內的所有 DICOM 檔案。
3.  **轉換為 NIfTI：** 使用 \`dicom2nifti()\` 函數將讀取的 DICOM 物件轉換為 NIfTI 物件。
4.  **儲存 NIfTI 檔案：** 使用 \`writeNIfTI()\` 函數將 NIfTI 物件儲存為一個 .nii.gz 檔案。

# 程式碼與結果要求
- 請在程式碼中提供設定 DICOM 資料夾路徑與輸出 NIfTI 檔案路徑的變數。
- 附上清晰的中文註解，解釋每個步驟的功能。`
  },
  {
    id: 37,
    title: 'fMRI 前處理：運動校正 (Motion Correction)',
    difficulty: '3. 進階應用',
    category: '臨床影像分析',
    uses: 210,
    likes: 115,
    description: '使用 `ANTsR` 套件對 fMRI 時間序列數據進行頭部運動校正，以減少因受試者移動造成的影像偽影。',
    tags: ['R 語言', 'fMRI', '前處理', '運動校正', 'ANTsR', '神經影像'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '在 fMRI 實驗過程中，受試者的微小頭部移動會導致數據分析的嚴重偏差。運動校正是 fMRI 預處理流程中不可或缺的關鍵步驟。',
    usageInstructions: '請將 `your_fmri_file.nii.gz` 替換成您的 4D fMRI NIfTI 檔案路徑。`typeofTransform` 參數可以根據需求調整，`"BOLDRigid"` 是適用於 BOLD 訊號的常用選項。',
    fullPrompt: `我正在進行 fMRI 數據的預處理，需要對時間序列影像進行頭部運動校正。

# 我的背景資訊
- **研究目的：** 消除或減少因受試者在掃描過程中的頭部移動所造成的訊號變異。
- **資料：** 一個 4D NIfTI 格式的 fMRI 影像檔案。
- **工具：** 我希望使用 R 語言的 \`ANTsR\` 套件。

# 我的任務
請提供 R 程式碼，完成以下運動校正流程：
1.  **載入套件與資料：** 載入 \`ANTsR\` 套件，並使用 \`antsImageRead()\` 讀取 4D fMRI 數據。
2.  **執行運動校正：** 使用 \`antsrMotionCalculation()\` 函數進行校正。請使用對 BOLD 數據優化的剛體變換 (\`typeofTransform = "BOLDRigid"\`)。
3.  **儲存結果：** 將校正後的 4D 影像 (\`moco_img\`) 和平均影像 (\`moco_avg_img\`) 儲存為 NIfTI 檔案。
4.  **(選做)** 儲存估算出的六個運動參數 (3個平移、3個旋轉)。

# 程式碼與結果要求
- 請在程式碼中提供設定輸入與輸出檔案路徑的變數。
- 附上清晰的中文註解，解釋 \`antsrMotionCalculation\` 函數的主要功能與輸出物件的內容。`
  },
    {
    id: 38,
    title: 'DTI 分析：計算分數異向性 (FA) 圖譜',
    difficulty: '3. 進階應用',
    category: '臨床影像分析',
    uses: 180,
    likes: 90,
    description: '使用 `dti` 套件從擴散權重成像 (DWI) 數據中估計擴散張量 (diffusion tensor)，並計算分數異向性 (FA) 圖譜以研究白質結構。',
    tags: ['R 語言', 'DTI', 'DWI', 'FA', '擴散張量', 'dti', '白質'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '分數異向性 (FA) 是衡量水分子擴散方向性的重要指標，常用於評估大腦白質纖維束的完整性。在神經科學與臨床研究中，FA 圖譜被廣泛用於比較不同族群（如病患 vs. 健康對照組）的白質微觀結構差異。',
    usageInstructions: '您需要先使用 `readDWIdata` 函數將您的 DWI 數據（影像、b-values、b-vectors）讀取為 `dtiData` 物件。然後將此物件傳入 `dtiTensor` 進行張量估計，最後用 `dtiIndices` 計算 FA。',
    fullPrompt: `我正在分析擴散張量成像 (DTI) 數據，需要計算並視覺化大腦的白質結構。

# 我的背景資訊
- **研究目的：** 從擴散權重成像 (DWI) 數據中，計算出分數異向性 (Fractional Anisotropy, FA) 圖譜，以評估白質纖維束的完整性。
- **資料：** 我已經將 DWI 影像、b-values 和 b-vectors 整理好，並準備使用 \`dti\` 套件讀取。

# 我的任務
請提供 R 程式碼，使用 \`dti\` 套件完成以下 DTI 分析流程：
1.  **載入套件與資料：** 載入 \`dti\` 套件，並假設已使用 \`readDWIdata()\` 將數據讀取為一個名為 \`dwiobj\` 的 \`dtiData\` 物件。
2.  **擴散張量估計：** 使用 \`dtiTensor()\` 函數，對 \`dwiobj\` 進行張量擬合。請使用非線性估計法 (\`method = "nonlinear"\`)。
3.  **計算 DTI 指標：** 使用 \`dtiIndices()\` 函數，從擬合的張量物件中計算出各種 DTI 指標，特別是 FA。
4.  **視覺化 FA 圖譜：** 使用 \`plot()\` 函數，將計算出的 FA 圖譜以彩色編碼 (color-coded FA map) 的方式呈現。

# 程式碼與結果要求
- 請提供一個完整的、從張量估計到視覺化的流程範例。
- 在註解中簡要解釋 FA 的意義，以及彩色 FA 圖譜中顏色（紅、綠、藍）所代表的方向性。`
  },
  {
    id: 39,
    title: 'fMRI 統計分析：一般線性模型 (GLM)',
    difficulty: '3. 進階應用',
    category: '臨床影像分析',
    uses: 250,
    likes: 130,
    description: '針對任務態 fMRI (task-based fMRI) 數據，建立一般線性模型 (GLM) 來偵測與實驗刺激相關的腦區活化。',
    tags: ['R 語言', 'fMRI', 'GLM', 'fmri', '腦功能', '統計參數圖'],
    isFavorite: false,
    essentialRank: null,
    usageContext: 'GLM 是分析任務態 fMRI 數據的標準方法。透過將觀測到的 BOLD 訊號與基於實驗設計的預期反應模型進行比較，我們可以識別出哪些腦區的活動與特定認知任務或刺激顯著相關。',
    usageInstructions: '您需要準備：1) 預處理過的 4D fMRI 數據；2) 一個描述實驗刺激時間點（onsets）和持續時間（durations）的檔案；3) （可選）頭部運動參數等共變數。將這些資訊傳入 `fmri.design` 建立設計矩陣，再用 `fmri.lm` 擬合模型。',
    fullPrompt: `我需要分析一組任務態 fMRI (task-based fMRI) 數據，找出與實驗任務相關的腦部活化區域。

# 我的背景資訊
- **研究目的：** 使用一般線性模型 (GLM) 分析 fMRI 數據，產生統計參數圖 (Statistical Parametric Map, SPM)。
- **資料：**
    - 一個預處理過的 4D fMRI NIfTI 檔案。
    - 一個描述實驗設計的檔案，包含每個刺激事件的開始時間 (onset) 和持續時間 (duration)。
    - (可選) 一個包含頭部運動參數的檔案，作為模型中的干擾變數 (nuisance variables)。

# 我的任務
請提供 R 程式碼，使用 \`fmri\` 套件完成 GLM 分析流程：
1.  **建立預期 BOLD 反應：** 根據實驗設計檔案，使用 \`fmri.stimulus()\` 函數生成預期的血氧濃度依賴性 (BOLD) 反應曲線 (HRF)。
2.  **建立設計矩陣：** 使用 \`fmri.design()\` 函數，將 HRF、運動參數及其他干擾變數（如趨勢項）整合成一個設計矩陣。
3.  **擬合 GLM：** 使用 \`fmri.lm()\` 函數，將設計矩陣擬合至 fMRI 數據，並指定要檢定的對比 (contrast)。
4.  **檢視結果：** 說明如何從擬合後的模型物件中提取出效果估計值 (cbeta) 和變異數 (var)。

# 程式碼與結果要求
- 請載入 \`fmri\` 套件。
- 程式碼需有清晰的中文註解，解釋從實驗設計到模型擬合的完整流程。`
  },
  {
    id: 40,
    title: 'R 基礎統計計算 (平均數, 標準差)',
    difficulty: '1. 入門必學',
    category: '描述性統計',
    uses: 1240,
    likes: 520,
    description: '使用 R 的基礎函數 (mean, sd, var) 快速計算數據集的核心描述性統計量，是數據分析的第一步。',
    tags: ['R 語言', '描述性統計', 'mean', 'sd', 'var'],
    isFavorite: true,
    essentialRank: null,
    usageContext: '在任何深入分析前，了解數據的集中趨勢 (平均值、中位數) 與離散程度 (標準差、變異數) 是至關重要的一步。此指令適用於任何數值型向量或資料欄位。',
    usageInstructions: '請將程式碼中的 `c(12, 18, 5, 25, 15, 8)` 替換成您自己的**數值向量**，或從資料框中提取的一個欄位 (例如 `my_data$column_name`)。',
    fullPrompt: `我需要使用 R 語言對一組數值數據進行基本的描述性統計分析。

# 我的背景資訊
- **研究目的：** 快速了解一組觀測數據 (例如，病患的某項生理指標) 的基本特性。
- **資料集：** 一個數值向量 \`x <- c(12, 18, 5, 25, 15, 8)\`。

# 我的任務
請提供 R 程式碼，計算這個向量的以下統計量：
1.  平均數 (Mean)
2.  變異數 (Variance)
3.  標準差 (Standard Deviation)

# 程式碼與結果要求
- 請使用 R 的內建函數 \`mean()\`, \`var()\`, 和 \`sd()\`。
- 程式碼應包含清晰的中文註解，解釋每個函數的作用。
- 最終清楚地呈現計算出的三個統計值。`
  },
  {
    id: 41,
    title: '相關係數與散佈圖 (cor, plot)',
    difficulty: '1. 入門必學',
    category: '雙變量繪圖',
    uses: 1580,
    likes: 690,
    description: '計算兩個連續變數的皮爾森相關係數，並繪製散佈圖來視覺化其線性關係的強度與方向。',
    tags: ['R 語言', '相關分析', 'cor', 'plot', '散佈圖'],
    isFavorite: true,
    essentialRank: null,
    usageContext: '當您需要量化並視覺化兩個連續變數（例如：年齡與血壓、劑量與反應率）之間的線性關係時，此指令提供標準的分析與繪圖方法。',
    usageInstructions: '請將 `x_vector` 和 `y_vector` 分別替換成您自己的**自變數**與**應變數**數據。程式碼將自動計算相關係數並繪製圖表。',
    fullPrompt: `我需要分析兩個連續變數之間的關係。

# 我的背景資訊
- **研究目的：** 探索調整後總收入 ('Adj. Gross Income') 與項目化扣除額 ('Itemized Deductions') 之間的關聯性。
- **資料集：** 假設有以下兩組數據：
    - \`adj_income <- c(77, 96, 50, 54, 130, 67, 135, 114)\`
    - \`item_deduct <- c(16, 15, 8, 10, 21, 13, 24, 24)\`

# 我的任務
請提供 R 程式碼，完成以下任務：
1.  **繪製散佈圖：** 使用 \`plot()\` 函數繪製兩個變數的散佈圖。
2.  **計算相關係數：** 使用 \`cor()\` 函數計算兩個變數的皮爾森 (Pearson) 相關係數。
3.  **計算決定係數：** 計算 R-squared 值。

# 程式碼與結果要求
- 散佈圖應有清楚的中文座標軸標籤。
- 清楚地印出相關係數 (r) 和決定係數 (R-squared)。
- 在註解中簡要解釋相關係數的意義。`
  },
  {
    id: 42,
    title: '簡單線性迴歸與模型摘要',
    difficulty: '2. 核心統計',
    category: '迴歸分析',
    uses: 1120,
    likes: 580,
    description: '使用 lm() 函數建立簡單線性迴歸模型，並學習如何解讀 summary() 輸出的係數、R-squared 和 p-value 等關鍵指標。',
    tags: ['R 語言', '線性迴歸', 'lm', 'summary', '模型評估'],
    isFavorite: true,
    essentialRank: null,
    usageContext: '當您想用一個連續的預測變數 (X) 來建立模型預測另一個連續的結果變數 (Y) 時，簡單線性迴歸是基礎且重要的方法。',
    usageInstructions: '請將 `formula = Y ~ X` 中的 `Y` 和 `X` 替換成您資料框中的**應變數**與**自變數**欄位名稱，並將 `data = your_data` 中的 `your_data` 替換成您的**資料框名稱**。',
    fullPrompt: `我需要為兩個變數建立一個簡單線性迴歸模型，並評估其擬合效果。

# 我的背景資訊
- **研究目的：** 使用市場報酬率 ('SPY') 來預測一支特定股票 ('MSFT') 的報酬率，即計算其 Beta 值。
- **資料集：** 假設有一個名為 \`stock_returns\` 的資料框，包含 'MSFT' 和 'SPY' 兩個欄位。

# 我的任務
請提供 R 程式碼，完成以下分析流程：
1.  **建立模型：** 使用 \`lm()\` 函數建立 'MSFT' 對 'SPY' 的簡單線性迴歸模型。
2.  **檢視模型摘要：** 使用 \`summary()\` 函數輸出完整的模型分析結果。
3.  **視覺化結果：** 繪製散佈圖，並使用 \`abline()\` 疊加上擬合出的迴歸線。

# 程式碼與結果要求
- 程式碼需有清晰的中文註解。
- 在註解中解釋如何從 \`summary()\` 結果中找出截距 (Alpha)、斜率 (Beta)、R-squared 和 p-value。`
  },
  {
    id: 43,
    title: '多元線性迴歸與係數解讀',
    difficulty: '3. 進階應用',
    category: '迴歸分析',
    uses: 880,
    likes: 450,
    description: '建立一個包含多個預測變數的線性模型，並學習如何在控制其他變數的情況下，解讀個別係數的意義與顯著性。',
    tags: ['R 語言', '多元迴歸', 'lm', '係數解讀', '模型比較'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '當您認為一個結果變數（如病患恢復時間）可能同時受到多個因素（如年齡、體重、治療類型）影響時，多元迴歸能幫助您建立預測模型並評估各因素的相對貢獻。',
    usageInstructions: '在 \`lm()\` 的公式中，將 \`Y ~ X1 + X2 + X3\` 中的 `Y` 替換為您的**應變數**，並在 \`~\` 後方用 \`+\` 連接所有您想納入的**自變數**。',
    fullPrompt: `我需要建立一個多元迴歸模型來預測一個應變數。

# 我的背景資訊
- **研究目的：** 使用廣告數量 ('Ads') 和行銷花費 ('Marketing') 兩個變數來共同預測網站的月收入 ('Revenue')。
- **資料集：** 假設有一個名為 \`website_data\` 的資料框，包含 'Revenue', 'Ads', 'Marketing' 三個欄位。

# 我的任務
請提供 R 程式碼，完成以下分析：
1.  **建立模型：** 使用 \`lm()\` 函數建立多元迴歸模型，公式為 \`Revenue ~ Ads + Marketing\`。
2.  **檢視模型摘要：** 使用 \`summary()\` 函數輸出模型結果。
3.  **解讀係數：** 在註解中，根據 \`summary()\` 的結果，解釋 'Ads' 和 'Marketing' 兩個變數的係數 (Estimate) 的實際意義。

# 程式碼與結果要求
- 程式碼需有清晰的中文註解。
- 註解中應清楚說明在控制另一變數不變的情況下，如何解釋單一變數的係數。
- 說明如何根據 p-value 判斷各變數的顯著性。`
  },
    {
    id: 44,
    title: '迴歸模型診斷圖 (殘差分析)',
    difficulty: '3. 進階應用',
    category: '迴歸分析',
    uses: 710,
    likes: 360,
    description: '在建立迴歸模型後，產生一套標準診斷圖，用以檢查殘差是否符合常態性、線性與等方差性等核心假設。',
    tags: ['R 語言', '迴歸診斷', '殘差分析', '模型假設', 'plot.lm'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '任何迴歸模型的結論都基於數個核心假設。模型診斷是確保您的模型可靠且結論有效的必要步驟，能幫助您發現潛在問題如非線性關係、異方差性或離群值。',
    usageInstructions: '請先使用 `lm()` 建立您的迴歸模型物件 (例如 `my_model`)，然後直接將該物件傳入 `plot()` 函數中，即 `plot(my_model)`，即可生成診斷圖。',
    fullPrompt: `我已經建立了一個線性迴歸模型，現在需要檢查其是否符合基本假設。

# 我的背景資訊
- **研究目的：** 對一個已建立的 \`lm\` 模型物件進行殘差分析，以診斷模型的適用性。
- **模型物件：** 假設我有一個名為 \`my_lm_model\` 的模型物件。

# 我的任務
請提供 R 程式碼，生成並解讀標準的迴歸診斷圖。

# 程式碼與結果要求
1.  **生成診斷圖：**
    -   使用 \`par(mfrow = c(2, 2))\` 將繪圖區域分割為 2x2 的網格。
    -   使用 \`plot(my_lm_model)\` 自動生成四張標準診斷圖。
2.  **解讀圖表：** 在程式碼的註解中，簡要說明如何解讀這四張圖：
    -   **Residuals vs Fitted：** 檢查線性關係與等方差性。
    -   **Normal Q-Q：** 檢查殘差的常態性。
    -   **Scale-Location：** 再次檢查等方差性。
    -   **Residuals vs Leverage：** 識別離群值與高槓桿點。`
  },
  {
    id: 45,
    title: '變數篩選：逐步迴歸 (Stepwise Regression)',
    difficulty: '3. 進階應用',
    category: '迴歸分析',
    uses: 680,
    likes: 410,
    description: '使用 `step()` 函數執行向後、向前或逐步迴歸，基於 AIC 準則自動從大量候選變數中，篩選出最簡潔且有效的預測模型。',
    tags: ['R 語言', '變數篩選', '逐步迴歸', 'step', 'AIC', '模型選擇'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '當您有多個潛在的預測變數，但不確定哪些應包含在最終模型中時，逐步迴歸提供了一種自動化的方法來進行模型選擇，以平衡模型的預測能力與簡潔性。',
    usageInstructions: '請先建立一個包含所有候選變數的「完整模型」(`full_model`) 和一個只含截距的「空模型」(`null_model`)。然後將這兩個模型傳入 `step()` 函數，並透過 `direction` 參數指定篩選方式 ("backward", "forward", 或 "both")。',
    fullPrompt: `我正在建立一個多元迴歸模型，擁有很多潛在的預測變數，我希望使用一種自動化的方法來篩選出最佳的變數組合。

# 我的背景資訊
- **研究目的：** 從一組候選變數中，使用逐步迴歸 (Stepwise Regression) 方法，基於赤池資訊量準則 (AIC) 來建立一個最優的預測模型。
- **資料集：** 假設有一個資料框 \`my_data\`，應變數為 \`Y\`，其餘所有欄位皆為候選的預測變數。

# 我的任務
請提供 R 程式碼，演示如何執行逐步迴歸。

# 程式碼與結果要求
1.  **建立初始模型：**
    -   建立一個包含所有預測變數的「完整模型」(\`full_model <- lm(Y ~ ., data = my_data)\`)。
    -   建立一個只包含截距的「空模型」(\`null_model <- lm(Y ~ 1, data = my_data)\`)。
2.  **執行逐步迴歸：** 使用 \`step()\` 函數，設定 \`direction = "both"\`，讓演算法同時考慮加入和移除變數。
3.  **檢視最終模型：** 使用 \`summary()\` 函數顯示由 \`step()\` 篩選出的最終模型的詳細結果。

# 程式碼與結果要求
- 程式碼需有清晰的中文註解，解釋逐步迴歸的流程。
- 最終應呈現最佳模型的摘要資訊。`
  },
  {
    id: 46,
    title: '製作動態圖表 (gganimate)',
    difficulty: '3. 進階應用',
    category: '動態與互動視覺化',
    uses: 310,
    likes: 190,
    description: '使用 gganimate 套件，將靜態的 ggplot2 圖表轉換為動態 GIF 動畫，生動地展示數據隨時間或其他變數的變化過程。',
    tags: ['R 語言', 'gganimate', 'ggplot2', '動態圖表', '動畫'],
    isFavorite: true,
    essentialRank: null,
    usageContext: '當您想呈現數據的演變過程時（例如：各國 GDP 隨年份的變化、模擬過程的迭代），動態圖表比多張靜態圖表或複雜的線圖更具表現力與吸引力。',
    usageInstructions: '在您完成一個 ggplot 物件後，加上 `transition_reveal()` 或 `transition_time()` 並指定動畫所依據的變數（通常是時間）。最後使用 `animate()` 函數來渲染動畫。',
    fullPrompt: `我已經使用 ggplot2 繪製了一張呈現多個國家「貿易條件」(Terms of Trade) 隨時間變化的靜態折線圖。我希望將這張圖轉換為動態動畫，以更生動地展示其趨勢演變。

# 我的背景資訊
- **研究目的：** 視覺化呈現不同國家群體自 2001 年至 2009 年的貿易條件變化。
- **圖形物件：** 假設我已建立一個名為 \`static_plot\` 的 ggplot 折線圖物件。

# 我的任務
請提供 R 程式碼，使用 \`gganimate\` 套件將 \`static_plot\` 轉換為一個動態圖表。

# 程式碼與結果要求
1.  **建立範例圖表：** 首先，建立一個基本的 ggplot 折線圖作為範例。
2.  **添加動畫層：** 在 ggplot 物件上，添加 \`transition_reveal()\` 函數，並以年份作為動畫推進的依據。
3.  **添加動態元素：** 使用 \`geom_point()\` 在動畫中顯示一個跟隨線條移動的點。
4.  **渲染動畫：** 說明如何使用 \`animate()\` 函數將動畫渲染並儲存為 GIF 檔案。

# 程式碼與結果要求
- 請載入 \`ggplot2\` 和 \`gganimate\` 套件。
- 程式碼需有清晰的中文註解，解釋動態化圖表的關鍵步驟。`
  },
  {
    id: 47,
    title: '建立互動式儀表板 (R Shiny)',
    difficulty: '3. 進階應用',
    category: '動態與互動視覺化',
    uses: 450,
    likes: 280,
    description: '使用 R Shiny 套件，將您的靜態 R 分析轉換為可互動的網頁應用程式，讓使用者能動態操作輸入並即時看到結果。',
    tags: ['R 語言', 'Shiny', '互動式儀表板', 'UI', 'Server'],
    isFavorite: true,
    essentialRank: null,
    usageContext: '當您希望非技術背景的同事、客戶或公眾能夠與您的分析結果互動時（例如：調整模型參數、篩選數據），Shiny 是一個強大的工具，能將您的 R 腳本變成一個網頁應用。',
    usageInstructions: '此為一個 Shiny App 的基本框架。您需要在 `ui` 部分定義使用者介面（如滑塊、下拉選單），並在 `server` 部分撰寫 R 程式碼，根據使用者的輸入來更新輸出（如圖表、表格）。',
    fullPrompt: `我需要為我的貿易數據分析建立一個簡單的互動式網頁應用，讓使用者可以從下拉選單中選擇一個國家，並看到該國家的關稅分佈圖。

# 我的背景資訊
- **研究目的：** 讓使用者能互動式地探索不同國家的關稅資料。
- **工具：** 我希望使用 R 語言的 \`shiny\` 套件。

# 我的任務
請提供一個完整的 R Shiny App (app.R) 程式碼框架，包含以下功能：

# 程式碼與結果要求
1.  **UI (使用者介面)：**
    -   包含一個標題。
    -   一個側邊欄，裡面有一個下拉式選單 (\`selectInput\`)，讓使用者可以選擇國家。
    -   一個主面板，用於顯示一個互動式圖表 (\`plotlyOutput\`)。
2.  **Server (伺服器邏輯)：**
    -   根據使用者在下拉選單中選擇的國家，篩選出對應的數據。
    -   使用 \`ggplot2\` 繪製篩選後數據的圖表。
    -   使用 \`plotly\` 套件的 \`ggplotly()\` 函數將 ggplot 圖表轉換為互動式圖表。
    -   將圖表渲染至 UI。
3.  **執行 App：** 最後使用 \`shinyApp(ui = ui, server = server)\` 執行應用。
4.  請使用範例數據 (例如 \`iris\`) 來建立一個可執行的完整範例，並附上清晰的中文註解。`
  },
  {
    id: 48,
    title: '分面繪圖 (Facet Grid) 呈現多維度比較',
    difficulty: '2. 核心統計',
    category: '多變量繪圖',
    uses: 920,
    likes: 410,
    description: '使用 ggplot2 的 facet_grid() 或 facet_wrap()，將數據按一或多個類別變數分割成子圖，方便在同一畫面中進行多維度比較。',
    tags: ['R 語言', 'ggplot2', '分面', 'facet_grid', '比較分析'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '當您想比較不同組別（例如：不同國家、不同年份）下兩個變數的關係時，分面繪圖能提供比將所有數據點畫在同一張圖上更清晰的洞見。',
    usageInstructions: '在 `facet_grid()` 的公式中，將 `rows ~ cols` 的 `rows` 和 `cols` 替換成您想用來分割圖表的**類別變數**。使用 `.` 表示該維度不進行分割。',
    fullPrompt: `我正在分析日本的關稅數據，希望比較不同年份、不同類型的關稅與非關稅壁壘 (NTB) 之間的關係。

# 我的背景資訊
- **研究目的：** 視覺化呈現 1996 年和 2001 年，四種不同關稅類型 ('tariff_name') 與 NTB ('ave_core_sim') 的散佈關係。
- **資料集：** 一個長格式的資料框，包含 'year', 'tariff_name', 'tariff_value', 'ave_core_sim' 等欄位。

# 我的任務
請提供 R 程式碼，使用 \`ggplot2\` 的 \`facet_grid()\` 函數繪製一張分面散佈圖。

# 程式碼與結果要求
1.  **建立散佈圖：** 以 'tariff_value' 為 X 軸，'ave_core_sim' 為 Y 軸。
2.  **設定分面：**
    -   使用 \`facet_grid()\` 函數。
    -   以 'year' 作為**列 (rows)** 的分面變數。
    -   以 'tariff_name' 作為**欄 (columns)** 的分面變數。
3.  **美化圖表：**
    -   使用 \`theme_bw()\` 或類似的學術主題。
    -   加上清晰的中文標題與座標軸標籤。
- 請附上中文註解。`
  },
  {
    id: 49,
    title: '合併多個資料框 (merge / dplyr joins)',
    difficulty: '2. 核心統計',
    category: '資料匯入與清洗',
    uses: 1350,
    likes: 620,
    description: '使用 R 的基礎 merge() 函數或 dplyr 套件的 join 系列函數 (left_join, inner_join 等)，根據一個或多個共通欄位 (key) 來合併兩個資料框。',
    tags: ['R 語言', 'dplyr', 'merge', 'left_join', '資料合併'],
    isFavorite: true,
    essentialRank: null,
    usageContext: '在實務分析中，數據常分散在不同檔案中（例如：一個檔案有交易數據，另一個有國家 GDP 數據）。合併資料框是將這些分散資訊整合起來的關鍵步驟。',
    usageInstructions: '請在 `by` 參數中指定用來匹配兩個資料框的**共通欄位名稱**。如果兩個資料框中的欄位名稱不同，可以使用 `by.x` 和 `by.y`。使用 dplyr 的 join 函數通常更直觀且快速。',
    fullPrompt: `我正在建立一個用於貿易分析的資料庫，需要將兩個不同的資料集合併在一起。

# 我的背景資訊
- **資料集一 (\`trade_data\`)：** 包含 'exporter', 'importer', 'year', 'trade_value' 等欄位。
- **資料集二 (\`gdp_data\`)：** 包含 'country', 'year', 'gdp' 等欄位。
- **合併目標：** 我需要將每個出口國 (exporter) 和進口國 (importer) 在對應年份的 GDP 資料，分別附加到 \`trade_data\` 資料框中。

# 我的任務
請提供 R 程式碼，使用 \`dplyr\` 套件的 \`left_join()\` 函數完成以下合併任務：
1.  **合併出口國 GDP：** 將 \`gdp_data\` 合併到 \`trade_data\` 中，以匹配出口國的 GDP。請注意，兩個資料框中的國家代碼欄位名稱不同 ('exporter' vs 'country')。
2.  **合併進口國 GDP：** 再次將 \`gdp_data\` 合併到上一步的結果中，以匹配進口國的 GDP。
3.  **處理欄位名稱：** 請在合併後適當地重新命名 GDP 欄位 (例如，'gdp.x' -> 'gdp_exporter', 'gdp.y' -> 'gdp_importer')。

# 程式碼與結果要求
- 請載入 \`dplyr\` 套件。
- 提供完整的、可執行的範例，包括建立模擬的 \`trade_data\` 和 \`gdp_data\`。
- 程式碼需有清晰的中文註解，解釋 \`left_join()\` 中 \`by\` 參數如何處理不同名稱的 key。`
  },
  {
    id: 50,
    title: '進階 ggplot2 美化：學術圖表客製化',
    difficulty: '3. 進階應用',
    category: '圖表美化與輸出',
    uses: 810,
    likes: 450,
    description: '學習客製化 ggplot2 的各種元素，包括圖例位置、標題樣式、座標軸文字等，產出符合出版品質的精美圖表。',
    tags: ['R 語言', 'ggplot2', 'theme', '圖表美化', '學術發表'],
    isFavorite: false,
    essentialRank: null,
    usageContext: 'ggplot2 的預設主題很美觀，但在學術發表或特定報告中，您常需要更精細地調整圖表的每個細節，例如圖例大小、標題置中、座標軸字體等，以符合排版要求。',
    usageInstructions: '在 `theme()` 函數中，您可以找到幾乎所有圖表元素的控制選項。例如，使用 `plot.title = element_text(hjust = 0.5)` 來將主標題置中。',
    fullPrompt: `我已經使用 ggplot2 繪製了一張基本的散佈圖，現在需要對其進行精細的美化，使其符合學術期刊的發表風格。

# 我的背景資訊
- **研究目的：** 繪製一張關於「哥倫比亞出口地理導向」的專業圖表。
- **圖形物件：** 假設我已建立一個名為 \`base_plot\` 的 ggplot 物件。

# 我的任務
請提供 R 程式碼，在 \`base_plot\` 的基礎上，使用 \`theme()\` 函數完成以下客製化調整：
1.  **主標題：** 將主標題置中、設定字體大小為 10、並加粗。
2.  **座標軸標題：** 設定 X 軸標題的字體大小。
3.  **圖例 (Legend)：**
    -   將圖例位置設定在圖表**底部** (\`"bottom"\`)。
    -   將圖例排列方向設為**垂直** (\`"vertical"\`)。
    -   設定圖例文字大小。
    -   設定圖例圖標 (key) 的大小。
    -   移除圖例的標題。

# 程式碼與結果要求
- 請先建立一個可執行的 \`base_plot\` 範例。
- 程式碼需有清晰的中文註解，解釋 \`theme()\` 中各個參數的功能。`
  },
  {
    id: 51,
    title: '製作論文 Table 1 (基線特徵表)',
    difficulty: '2. 核心統計',
    category: '描述性統計',
    uses: 1420,
    likes: 810,
    description: '使用 tableone 套件，快速生成符合學術論文標準的「表一」，比較不同組別間的基線人口統計學與臨床特徵。',
    tags: ['R 語言', 'tableone', 'Table 1', '基線特徵', '論文發表'],
    isFavorite: true,
    essentialRank: 6,
    usageContext: '在任何臨床研究報告中，「表一」是呈現研究對象基本特徵、並比較實驗組與對照組是否均衡的標準表格。此指令能自動化這個繁瑣的過程，並自動計算 p-value 或標準化平均差異 (SMD)。',
    usageInstructions: '請安裝並載入 `tableone` 套件。將 `my_data` 替換成您的資料框。在 `CreateTableOne` 函數中，將 `strata` 參數設為您的**分組變數**，`vars` 參數設為您想呈現的所有**變數列表**。使用 `print` 時，可指定 `nonnormal` 變數以中位數呈現。',
    fullPrompt: `我正在準備一篇臨床研究論文，需要製作一張標準的「表一」(Table 1)，用來呈現並比較我的實驗組與對照組在基線時的人口統計學與臨床特徵。

# 我的背景資訊
- **研究目的：** 比較接受某種新療法 (實驗組) 與標準療法 (對照組) 的病患，其基線特徵是否均衡。
- **資料集：** 一個名為 \`my_study_data\` 的資料框，包含分組變數 \`treatment_group\` 以及多個病患特徵 (如 \`age\`, \`gender\`, \`bmi\`, \`comorbidity_score\`)。

# 我的任務
請提供 R 程式碼，使用 \`tableone\` 套件來自動生成這張表格。

# 程式碼與結果要求
1.  **定義變數列表：** 建立一個向量，包含所有想放入表格的變數名稱。
2.  **生成表格：** 使用 \`CreateTableOne()\` 函數，設定 \`data\`、\`vars\` 和 \`strata\` (分組變數) 參數。
3.  **處理非正規分佈變數：** 假設我知道 \`bmi\` 和 \`comorbidity_score\` 是偏態分佈，請在印出表格時，將它們的摘要統計量顯示為「中位數 [四分位距]」，而非「平均數 (標準差)」。
4.  **顯示所有類別：** 對於類別變數 (如 gender)，請顯示所有類別的計數與百分比。
5.  **包含標準化平均差異 (SMD)：** 在表格中加入 SMD，以量化組間的不平衡程度。
- 請附上清晰的中文註解。`
  },
  {
    id: 52,
    title: '相關性矩陣熱力圖 (corrplot 進階)',
    difficulty: '2. 核心統計',
    category: '多變量繪圖',
    uses: 880,
    likes: 420,
    description: '使用 corrplot 套件，將相關性矩陣以圓圈、數字或混合方式呈現，並自動標示不顯著的相關性。',
    tags: ['R 語言', 'corrplot', '相關性矩陣', '視覺化', '探索性分析'],
    isFavorite: true,
    essentialRank: null,
    usageContext: '當您需要一次呈現多個變數間的相關性時，corrplot 提供了比基礎繪圖更豐富多樣的視覺化選項，能讓您快速洞察數據中的模式，是探索性資料分析的利器。',
    usageInstructions: '請先準備一個只包含數值變數的資料框。將此資料框傳入 `cor()` 函數計算相關性矩陣。在 `corrplot()` 中，您可以透過 `method` 參數（如 "circle", "number", "color"）和 `type` 參數（如 "upper", "lower"）來客製化您的圖表。',
    fullPrompt: `我正在進行探索性資料分析，想了解數據集中多個數值變數之間的相互關係。

# 我的背景資訊
- **研究目的：** 視覺化呈現一個包含多個連續變數的資料框的相關性結構。
- **資料集：** R 內建的 \`mtcars\` 資料集，我只對其中的數值變數感興趣。

# 我的任務
請提供 R 程式碼，使用 \`corrplot\` 套件來繪製一張資訊豐富且美觀的相關性矩陣圖。

# 程式碼與結果要求
1.  **資料準備：** 從 \`mtcars\` 中篩選出所有數值/連續變數。
2.  **計算相關性矩陣：** 使用 \`cor()\` 函數計算皮爾森相關係數矩陣。
3.  **繪製混合式相關圖：** 使用 \`corrplot()\` 函數，讓圖的上半部分以**圓圈**視覺化，下半部分則顯示**相關係數數值**。
4.  **重新排序：** 根據層次聚類 (\`hclust\`) 的結果對相關性矩陣進行重新排序，以便將相似的變數聚集在一起。
5.  **標示不顯著的相關性：** 計算相關性的 p-value 矩陣，並在圖中將不顯著 (例如 p > 0.05) 的相關性打上叉號。

- 請附上載入必要套件的程式碼與清晰的中文註解。`
  },
  {
    id: 53,
    title: 'Cox 比例風險模型 (存活分析)',
    difficulty: '3. 進階應用',
    category: '迴歸分析',
    uses: 450,
    likes: 290,
    description: '建立 Cox 比例風險模型，在控制多個共變數的情況下，估計特定因子對事件發生風險的影響（風險比, Hazard Ratio）。',
    tags: ['R 語言', '存活分析', 'Cox 迴歸', 'coxph', 'Hazard Ratio', '臨床研究'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '當您想了解多個因素（如年齡、治療方式、生物標記）如何共同影響病患的存活時間時，Cox 迴歸是比 Log-Rank 檢定更進階的方法，它能提供每個因素調整後的風險比 (HR)。',
    usageInstructions: '與 Kaplan-Meier 曲線類似，您需要先用 `Surv()` 函數建立存活物件。然後將此物件作為應變數，在 `coxph()` 的公式中放入您想分析的所有預測變數。',
    fullPrompt: `我正在進行一項臨床存活分析，在比較過 Kaplan-Meier 曲線後，我希望進一步建立一個多變量模型，來探討不同預後因子對存活的影響。

# 我的背景資訊
- **研究目的：** 使用 Cox 比例風險模型，在控制年齡與性別後，評估某種治療方式對病患存活時間的影響。
- **資料集：** 使用 \`survival\` 套件內建的 \`lung\` 資料集。
- **變數角色：**
    - 應變數: 存活時間 (\`time\`) 與存活狀態 (\`status\`)。
    - 自變數: 治療方式 (\`ph.ecog\`)、年齡 (\`age\`)、性別 (\`sex\`)。

# 我的任務
請提供 R 程式碼，使用 \`survival\` 套件執行 Cox 比例風險迴歸分析。

# 程式碼與結果要求
1.  **建立存活物件：** 使用 \`Surv()\` 函數建立存活物件。
2.  **擬合 Cox 模型：** 使用 \`coxph()\` 函數建立多變量模型。
3.  **檢視模型摘要：** 使用 \`summary()\` 函數輸出模型結果。
4.  **解讀結果：** 在註解中簡要說明如何解讀以下幾個關鍵指標：
    -   \`coef\` (log hazard ratio)。
    -   \`exp(coef)\` (Hazard Ratio, HR)。
    -   HR 的 95% 信賴區間。
    -   p-value (Pr(>|z|))。
    -   並解釋 HR=1.5 的具體意義。
5.  **檢驗比例風險假設：** 使用 \`cox.zph()\` 函數檢驗模型是否符合比例風險假設，並解釋其結果。`
  },
  {
    id: 54,
    title: '傾向分數匹配 (PSM) 分析',
    difficulty: '3. 進階應用',
    category: '因果推論',
    uses: 380,
    likes: 250,
    description: '使用 MatchIt 套件執行傾向分數匹配，以在觀察性研究中平衡處理組與對照組的基線共變數，從而更準確地估計處理效應。',
    tags: ['R 語言', '傾向分數', 'PSM', 'MatchIt', '因果推論', '觀察性研究'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '在無法進行隨機對照試驗 (RCT) 的觀察性研究中，處理組與對照組常存在系統性差異。PSM 是一種模擬隨機分配的統計方法，能減少選擇偏誤，讓組間比較更具說服力。',
    usageInstructions: '請安裝 `MatchIt` 與 `cobalt` (用於 Love plot) 套件。在 `matchit()` 函數中，公式的左邊是您的**處理變數**，右邊是所有需要匹配的**基線共變數**。',
    fullPrompt: `我正在進行一項觀察性研究，由於無法進行隨機分配，我需要使用傾向分數匹配 (Propensity Score Matching, PSM) 來減少處理組與對照組之間的選擇偏誤。

# 我的背景資訊
- **研究目的：** 評估某項治療 (\`treat\`) 對於某個連續結果 (\`outcome\`) 的因果效應。
- **資料集：** 一個名為 \`observational_data\` 的資料框，包含處理變數、結果變數，以及多個可能影響處理分配的基線共變數 (confounders)，如 \`age\`, \`sex\`, \`severity\` 等。

# 我的任務
請提供 R 程式碼，使用 \`MatchIt\` 和 \`cobalt\` 套件，演示一個完整的 PSM 分析流程。

# 程式碼與結果要求
1.  **執行匹配：** 使用 \`MatchIt::matchit()\` 函數，以共變數預測處理分配，進行 1:1 最近鄰匹配，並設定一個卡尺 (caliper)。
2.  **評估匹配後平衡性：**
    -   使用 \`summary()\` 函數檢視匹配前後的平衡性摘要。
    -   繪製 Love Plot (使用 \`cobalt::love.plot\`) 來視覺化標準化平均差異 (SMD) 的改善情況。
3.  **提取匹配後數據：** 使用 \`match.data()\` 函數建立一個只包含匹配後樣本的資料框。
4.  **分析處理效應：** 在匹配後的數據上，使用適當的統計方法 (例如，考慮到配對結構的 paired t-test) 來估計處理對結果的效應。

- 請附上清晰的中文註解，解釋 PSM 的每個關鍵步驟。`
  },
  {
    id: 55,
    title: '資料清理：遺漏值 (NA) 偵測、移除與插補',
    difficulty: '1. 入門必學',
    category: '資料匯入與清洗',
    uses: 1600,
    likes: 750,
    description: '在 R 中處理惱人的遺漏值 (NA)。學習如何偵測、視覺化、移除，以及使用平均數/中位數插補 NA。',
    tags: ['R 語言', '資料清理', 'NA', '遺漏值', 'dplyr', 'naniar'],
    isFavorite: true,
    essentialRank: null,
    usageContext: '任何真實世界的數據都可能存在遺漏值。在進行統計分析或機器學習前，妥善處理 NA 是確保結果準確性的關鍵第一步。',
    usageInstructions: '請將 `your_data` 替換成您的資料框。程式碼提供了多種策略，您可以根據您的分析需求選擇最適合的方法（例如，直接刪除或進行插補）。',
    fullPrompt: `我正在進行資料前處理，我的資料集中有許多遺漏值 (NA)，這影響了我的後續分析。

# 我的背景資訊
- **研究目的：** 在進行迴歸分析前，需要先清理資料中的遺漏值。
- **資料集：** 使用 R 內建的 \`airquality\` 資料集作為範例，其中 \`Ozone\` 和 \`Solar.R\` 欄位有 NA。

# 我的任務
請提供一段 R 程式碼，演示處理遺漏值的完整流程：
1.  **偵測與計數：** 如何計算整個資料框以及每個欄位的 NA 數量。
2.  **視覺化：** (可選) 使用 \`naniar\` 套件的 \`vis_miss()\` 函數來視覺化遺漏值的模式。
3.  **移除遺漏值：**
    -   移除任何含有 NA 的整列資料 (listwise deletion)。
    -   只移除特定欄位為 NA 的列。
4.  **插補遺漏值 (Imputation)：**
    -   使用該欄位的**平均值**來填補 NA。
    -   使用該欄位的**中位數**來填補 NA (對於偏態分佈數據更穩健)。

# 程式碼與結果要求
- 請載入 \`dplyr\` 和 \`naniar\` 套件。
- 程式碼需有清晰的中文註解，解釋不同處理方法的適用情境。`
  },
  {
    id: 56,
    title: '資料篩選與選取 (dplyr filter/select)',
    difficulty: '1. 入門必學',
    category: '資料匯入與清洗',
    uses: 1900,
    likes: 880,
    description: '使用 dplyr 套件的 filter() 和 select() 函數，根據條件篩選觀測值 (列) 並選取特定變數 (欄)，是 R 數據處理的核心技能。',
    tags: ['R 語言', 'dplyr', 'filter', 'select', '資料處理', '子集'],
    isFavorite: true,
    essentialRank: null,
    usageContext: '當您需要從大型資料集中提取符合特定條件的子集進行分析時，例如，只分析特定年份的數據、或只看特定幾個變數的關係，此指令提供了最高效的方法。',
    usageInstructions: '請將 `mtcars` 替換成您的資料框名稱，並在 `filter()` 和 `select()` 中修改條件與變數名稱以符合您的需求。',
    fullPrompt: `我需要從一個大型資料框中，根據多個條件篩選出我感興趣的觀測值，並只保留部分欄位進行後續分析。

# 我的背景資訊
- **研究目的：** 篩選出特定條件的車輛數據，並只關注油耗與性能相關的幾個變數。
- **資料集：** 使用 R 內建的 \`mtcars\` 資料集。

# 我的任務
請提供 R 程式碼，使用 \`dplyr\` 套件完成以下數據篩選與選取任務：
1.  **篩選觀測值 (列)：** 使用 \`filter()\` 函數，篩選出所有汽缸數 (\`cyl\`) 為 6 且馬力 (\`hp\`) 大於 100 的車輛。
2.  **選取變數 (欄)：** 使用 \`select()\` 函數，只保留 \`mpg\` (油耗), \`cyl\` (汽缸數), \`hp\` (馬力), \`wt\` (車重) 這幾個欄位。
3.  **組合操作：** 使用管道符 (pipe operator, \`%>%\`) 將上述篩選和選取操作串聯起來，一步到位。
4.  **更多範例：**
    -   如何篩選出 \`cyl\` 是 6 或 8 的車輛 (\`%in%\`)。
    -   如何選取從 \`mpg\` 到 \`hp\` 之間的所有欄位。

# 程式碼與結果要求
- 請載入 \`dplyr\` 套件。
- 程式碼需有清晰的中文註解，解釋 \`filter()\`, \`select()\` 以及管道符 \`%>%\` 的用法。`
  },
  {
    id: 57,
    title: '分組描述性統計 (dplyr group_by/summarise)',
    difficulty: '1. 入門必學',
    category: '描述性統計',
    uses: 1750,
    likes: 810,
    description: '使用 dplyr 的 group_by() 和 summarise() 函數，快速計算不同組別的描述性統計量，如平均數、標準差、個數等。',
    tags: ['R 語言', 'dplyr', 'group_by', 'summarise', '描述性統計', '分組計算'],
    isFavorite: true,
    essentialRank: null,
    usageContext: '在比較不同組別（如實驗組 vs. 對照組、不同性別、不同物種）的數據特徵時，分組計算是必不可少的步驟。此指令是生成論文中描述性統計表格的基礎。',
    usageInstructions: '請將 `iris`, `Species`, `Sepal.Length`, `Sepal.Width` 替換成您的**資料框**、**分組變數**以及您想分析的**數值變數**。您可以在 `summarise()` 中自由添加或修改想計算的統計量，例如 `median()`, `min()`, `max()`。',
    fullPrompt: `我需要計算資料集中不同組別的描述性統計量，例如，計算不同品種鳶尾花的平均花瓣長度。

# 我的背景資訊
- **研究目的：** 比較三種鳶尾花 ('Species') 在花萼長度 ('Sepal.Length') 和寬度 ('Sepal.Width') 上的統計差異。
- **資料集：** 使用 R 內建的 \`iris\` 資料集。

# 我的任務
請提供 R 程式碼，使用 \`dplyr\` 套件的 \`group_by()\` 和 \`summarise()\` 函數完成以下分組統計任務：
1.  **按 'Species' 分組。**
2.  計算每個 'Species' 組內的以下統計量：
    -   平均花萼長度 (\`mean_sepal_length\`)
    -   花萼長度的標準差 (\`sd_sepal_length\`)
    -   平均花萼寬度 (\`mean_sepal_width\`)
    -   每個組的樣本數 (\`count\`)

# 程式碼與結果要求
- 請載入 \`dplyr\` 套件。
- 使用管道符 (pipe operator, \`%>%\`) 將 \`group_by()\` 和 \`summarise()\` 串聯起來。
- 程式碼需有清晰的中文註解，解釋每個步驟的功能。
- 最終輸出的結果應為一個整潔的摘要表格。`
  },
  {
    id: 58,
    title: '基礎繪圖客製化 (Base R Graphics)',
    difficulty: '2. 核心統計',
    category: '圖表美化與輸出',
    uses: 350,
    likes: 150,
    description: '學習使用 R 基礎繪圖系統 (Base R Graphics) 的 `par()` 和低階繪圖函數 (如 `legend`, `lines`)，從零開始打造一張符合出版要求的客製化圖表。',
    tags: ['R 語言', 'Base R', 'plot', 'par', '圖表美化', '基礎繪圖'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '雖然 ggplot2 功能強大，但 R 的基礎繪圖系統提供了對圖表元素最直接、最細緻的控制。了解 Base R Graphics 能讓您在不依賴特定套件的情況下，創建任何您想要的圖形。',
    usageInstructions: '此指令演示了如何分步繪製並美化圖表。您可以修改 `plot()` 中的 `pch`, `col` 等參數，並調整 `legend()` 中的位置與內容，以符合您的需求。',
    fullPrompt: `我需要使用 R 的基礎繪圖系統 (Base R Graphics)，而不是 ggplot2，來創建一張具有多個客製化元素的學術圖表。

# 我的背景資訊
- **研究目的：** 比較兩種不同處理方式下，劑量與反應之間的關係。
- **資料集：** 假設有兩組實驗數據。

# 我的任務
請提供 R 程式碼，使用 Base R 繪圖函數完成以下任務：
1.  **建立範例數據：** 建立兩組 X 和 Y 數據 (例如 \`x\`, \`y1\`, \`y2\`)。
2.  **繪製基礎圖層：** 使用 \`plot()\` 函數繪製第一組數據的散佈圖，但先不繪製座標軸標籤和標題。
3.  **添加第二組數據：** 使用 \`points()\` 函數將第二組數據的散佈圖疊加到現有圖表上，並使用不同的符號和顏色。
4.  **添加迴歸線：** 分別為兩組數據添加迴歸線，使用 \`abline()\` 和 \`lm()\`，並設定不同線型。
5.  **客製化標題與座標軸：** 使用 \`title()\` 函數添加主標題、副標題和座標軸標籤。
6.  **添加圖例：** 使用 \`legend()\` 函數在圖表右上角添加一個清晰的圖例，解釋不同顏色/符號代表的組別。

# 程式碼與結果要求
- 整個過程**只使用 Base R 的繪圖函數**。
- 程式碼需有清晰的中文註解，解釋 \`plot()\`, \`points()\`, \`abline()\`, \`title()\`, \`legend()\` 等函數以及 \`pch\`, \`col\`, \`lty\` 等圖形參數的意義。
- 最終圖表應包含所有指定的客製化元素。`
  },
  {
    id: 59,
    title: '提升程式碼效率：向量化操作',
    difficulty: '1. 入門必學',
    category: '資料匯入與清洗',
    uses: 980,
    likes: 450,
    description: '學習 R 語言的核心優勢：向量化 (Vectorization)。比較 for 迴圈與向量化操作在處理數據時的巨大效能差異。',
    tags: ['R 語言', '效能', '向量化', 'for 迴圈', '最佳化'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '當您需要對整個資料欄位進行數學運算時（例如，將所有數值轉換單位、計算新指標），使用 R 的內建向量化功能會比逐一處理的 for 迴圈快上數十甚至數百倍。',
    usageInstructions: '此範例演示了如何將一個數值向量中的每個元素進行條件式轉換。請觀察 `for` 迴圈寫法與直接使用 `ifelse()` 的向量化寫法，並比較其執行時間。',
    fullPrompt: `我希望學習如何撰寫更高效的 R 程式碼，特別是想了解「向量化」操作與傳統 for 迴圈的差異。

# 我的背景資訊
- **研究目的：** 比較兩種不同的程式碼寫法在處理大量數據時的效能。
- **任務：** 對一個包含 100 萬個隨機數的向量進行條件判斷：如果數值大於 0，則取其平方根；否則，設為 0。

# 我的任務
請提供 R 程式碼，完成以下任務：
1.  **建立範例數據：** 生成一個包含 100 萬個常態分佈隨機數的向量。
2.  **for 迴圈寫法：** 使用 \`for\` 迴圈遍歷向量中的每一個元素，並使用 \`if-else\` 進行條件判斷與賦值。
3.  **向量化寫法：** 使用 \`ifelse()\` 函數，一次性完成對整個向量的條件判斷與賦值。
4.  **效能比較：** (選做) 使用 \`microbenchmark\` 套件來精確比較兩種寫法的執行速度。

# 程式碼與結果要求
- 請在程式碼中附上清晰的中文註解，解釋兩種寫法的邏輯。
- 在註解中總結為何向量化操作在 R 中通常遠比迴圈來得高效。`
  },
  {
    id: 60,
    title: '進階資料清理：dplyr 管道鏈式操作',
    difficulty: '2. 核心統計',
    category: '資料匯入與清洗',
    uses: 1150,
    likes: 680,
    description: '展示一個真實世界的 dplyr 資料清理流程，串聯 `mutate`, `filter`, `group_by`, `summarise` 等多個動詞，完成複雜的資料轉換任務。',
    tags: ['R 語言', 'dplyr', '資料清理', '管道操作', 'mutate', 'summarise'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '在處理原始臨床或實驗數據時，通常需要一連串的步驟來整理成可分析的格式。此指令展示了一個完整的管道 (pipeline) 範例，從原始數據到摘要表格。',
    usageInstructions: '請將此範例中的變數與操作，替換成您自己的資料清理邏輯。重點在於學習如何將多個步驟用 `%>%` 流暢地串接起來，使程式碼更具可讀性。',
    fullPrompt: `我需要對一份原始的臨床數據進行一系列的清理、轉換與摘要，以便進行後續分析。

# 我的背景資訊
- **研究目的：** 從一份病患資料中，計算不同治療組別 ('group') 的平均年齡、女性比例，以及 BMI 大於 25 的人數。
- **資料集：** 假設有一份名為 \`patient_data\` 的資料框，包含 'id', 'age', 'gender', 'height_cm', 'weight_kg', 'group' 等欄位，且其中有遺漏值。

# 我的任務
請提供一段 R 程式碼，使用 \`dplyr\` 的管道操作 (\`%>%\`)，**一次性地**完成以下所有步驟：
1.  **計算 BMI：** 使用 \`mutate()\` 根據身高和體重計算新的 'bmi' 欄位。
2.  **處理遺漏值：** 使用 \`filter()\` 移除 'bmi' 為 NA 的病患。
3.  **分組：** 使用 \`group_by()\` 按照 'group' 進行分組。
4.  **計算摘要統計：** 使用 \`summarise()\` 計算每組的：
    -   總人數 (\`n()\`)
    -   平均年齡 (\`mean(age)\`)
    -   女性比例 (\`mean(gender == "Female")\`)
    -   BMI > 25 的人數 (\`sum(bmi > 25)\`)

# 程式碼與結果要求
- 請載入 \`dplyr\` 套件。
- 整個流程應使用一個連續的 \`%>%\` 管道串接完成。
- 程式碼需有清晰的中文註解，解釋每個 dplyr 動詞的功能。`
  },
  {
    id: 61,
    title: '建立可重複使用的自訂 R 函數',
    difficulty: '2. 核心統計',
    category: '資料匯入與清洗',
    uses: 950,
    likes: 510,
    description: '將一段常用的分析或繪圖程式碼封裝成一個自訂函數，以提高程式碼的重用性與可讀性，避免重複撰寫相同邏輯。',
    tags: ['R 語言', '函數', 'function', '程式碼重用', 'DRY'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '當您發現自己需要在不同地方重複複製貼上同一段程式碼時（例如，為不同變數計算相同的統計量並繪製相似的圖），就是將它寫成一個函數的最佳時機。',
    usageInstructions: '此範例將「計算標準化分數 (z-score)」這個操作封裝成函數。請學習其結構，包含 `function()` 關鍵字、參數 (arguments) 和返回值 (return value)，並嘗試將您自己的程式碼改寫成函數。',
    fullPrompt: `我經常需要計算一個數值向量的標準化分數 (z-score)，我希望將這個計算過程寫成一個可以重複使用的 R 函數。

# 我的背景資訊
- **研究目的：** 避免重複撰寫相同的程式碼，提高分析效率與程式碼可讀性。
- **公式：** z-score = (x - mean(x)) / sd(x)

# 我的任務
請提供 R 程式碼，完成以下任務：
1.  **建立函數：** 建立一個名為 \`calculate_z_score\` 的函數，它應接收一個數值向量 \`x\` 作為輸入。
2.  **處理遺漏值：** 在函數內部，計算平均值和標準差時，應能處理遺漏值 (使用 \`na.rm = TRUE\`)。
3.  **返回值：** 函數應返回一個與輸入向量 \`x\` 等長的 z-score 向量。
4.  **提供文件註解：** 在函數上方使用 Roxygen2 風格的註解，說明函數的功能、參數 (\`@param\`) 和返回值 (\`@return\`)。
5.  **使用範例：** 提供一個如何呼叫這個新函數的簡單範例。

# 程式碼與結果要求
- 程式碼應包含完整的函數定義、文件註解和使用範例。`
  },
  {
    id: 62,
    title: '使用 purrr::map 進行迭代分析',
    difficulty: '3. 進階應用',
    category: '進階統計模型',
    uses: 780,
    likes: 490,
    description: '使用 `purrr` 套件的 `map()` 函數取代 `for` 迴圈，以更優雅、更具擴展性的方式，對資料的不同子集執行相同的分析（如迴歸）或繪製多張圖表。',
    tags: ['R 語言', 'purrr', 'map', '迭代', '函數式程式設計', '迴歸模型'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '當您需要對多個結果變數、多個分組、或多個資料集執行完全相同的模型擬合或繪圖流程時，`purrr::map()` 能讓您避免複雜的迴圈，用更簡潔的程式碼完成任務。',
    usageInstructions: '此範例以 `mtcars` 資料集為例，演示如何為不同的預測變數分別建立對 `mpg` 的線性迴歸模型。請將 `lm()` 的部分替換成您想重複執行的任何函數。',
    fullPrompt: `我需要對資料集中的多個變數，分別建立簡單線性迴歸模型，來預測油耗 ('mpg')。

# 我的背景資訊
- **研究目的：** 探討 \`mtcars\` 資料集中，'wt', 'hp', 'qsec' 這三個變數分別與 'mpg' 的關係。
- **傳統方法：** 我可以手動寫三次 \`lm()\`，但希望有更自動化、更具擴展性的方法。

# 我的任務
請提供 R 程式碼，使用 \`purrr\` 套件的 \`map()\` 函數，迭代地為每個預測變數建立迴歸模型。

# 程式碼與結果要求
1.  **載入套件：** 載入 \`purrr\` 和 \`dplyr\`。
2.  **定義預測變數：** 建立一個包含您想分析的預測變數名稱的字元向量 (\`c("wt", "hp", "qsec")\`)。
3.  **使用 map 迭代：**
    -   使用 \`purrr::map()\` 函數，迭代這個字元向量。
    -   在 \`map()\` 內部，使用匿名函數 (\`~\`) 動態地建立迴歸公式 (\`as.formula()\`) 並擬合 \`lm()\` 模型。
4.  **整理模型結果：** (選做但建議) 結合 \`map()\` 和 \`broom::tidy()\`，將所有模型結果（係數、p-value等）整理成一個乾淨的 data frame。

- 程式碼需有清晰的中文註解，解釋如何使用 \`map\` 來取代 \`for\` 迴圈。`
  },
  {
    id: 63,
    title: '使用 tryCatch 處理分析中的錯誤',
    difficulty: '3. 進階應用',
    category: '程式碼除錯',
    uses: 550,
    likes: 320,
    description: '在進行批次分析或迭代時，使用 `tryCatch()` 來捕捉可能發生的錯誤 (例如模型無法收斂)，讓程式碼在遇到錯誤時不會中斷，而是能繼續執行或記錄錯誤。',
    tags: ['R 語言', '錯誤處理', 'tryCatch', '除錯', '穩健性'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '當您需要對數百個基因、數千個病患進行自動化分析時，其中若有一個分析出錯導致整個程式中斷，將會非常耗時。`tryCatch` 能優雅地處理這些例外情況。',
    usageInstructions: '請將 `tryCatch()` 內的 `expr` 區塊換成您自己可能出錯的程式碼，並在 `error` 函數中定義遇到錯誤時要執行的操作（例如，返回 NA 或印出錯誤訊息）。',
    fullPrompt: `我正在使用迴圈或 \`purrr::map\` 對多個資料子集進行迴歸分析，但其中某些子集的數據有問題，會導致 \`lm()\` 函數報錯，進而中斷整個分析流程。

# 我的背景資訊
- **研究目的：** 建立一個穩健的分析流程，即使在迭代過程中遇到錯誤，也能繼續完成其餘的分析。

# 我的任務
請提供 R 程式碼，演示如何將一個可能出錯的操作（例如，對一個只有單一數據點的子集進行迴歸）包裝在 \`tryCatch()\` 中。

# 程式碼與結果要求
1.  **建立一個範例情境：** 使用 \`purrr::map()\` 迭代一個列表，其中一個元素會導致 \`lm()\` 報錯。
2.  **演示錯誤：** 首先，執行沒有錯誤處理的程式碼，展示它會如何中斷。
3.  **加入 tryCatch：** 接著，在 \`map()\` 的匿名函數中，將 \`lm()\` 呼叫包裝在 \`tryCatch()\` 區塊內。
4.  **定義錯誤處理邏輯：** 在 \`tryCatch\` 的 \`error\` 參數中，定義一個函數。當錯誤發生時，這個函數應該被觸發，並返回一個預設值（例如 \`NULL\` 或一個包含錯誤訊息的字串）。

- 程式碼需有清晰的中文註解，解釋 \`tryCatch\` 的 \`expr\` 和 \`error\` 兩個主要參數的作用。`
  },
  {
    id: 64,
    title: '貝氏假說檢定：比例的單邊檢定',
    difficulty: '3. 進階應用',
    category: '統計檢定',
    uses: 385,
    likes: 192,
    description: '使用貝氏因子 (Bayes Factor) 檢定未知比例是否超過特定閾值，是傳統 p-value 之外的另一種推斷選擇。',
    tags: ['R 語言', '貝氏統計', '假說檢定', 'Bayes Factor', 'Beta-Binomial', '臨床試驗'],
    isFavorite: true,
    essentialRank: null,
    usageContext: '當您需要比較一個比例（如藥品合格率、不良反應率）是否超過某個法規或臨床標準，並希望在分析中納入先驗知識（Prior Knowledge）時，貝氏假說檢定提供了比傳統 p-value 更豐富的證據強度衡量。',
    usageInstructions: '請在程式碼的 `# 1. 設定` 區塊中，設定您的**先驗分佈參數** (`prior_alpha`, `prior_beta`)，**觀測數據** (樣本數 `n`, 事件數 `x`)，以及您要檢定的**閾值** (`threshold`)。',
    fullPrompt: `我正在進行一項臨床試驗分析，需要評估新藥的不良反應率是否顯著低於一個安全閾值。

# 我的背景資訊
- **研究目的：** 檢定新藥的不良反應率 (θ) 是否低於 20%。
- **假說：**
    - H1: θ < 0.2 (新藥安全)
    - H2: θ >= 0.2 (新藥不安全)
- **分析方法：** 我希望使用貝氏假說檢定，並納入先前研究得到的先驗資訊。

# 我的任務
請提供 R 程式碼，完成以下貝氏分析流程：
1.  **設定先驗與數據：**
    -   假設根據過往文獻，我們對 θ 的先驗信念可以用 Beta(1, 4) 分佈來描述 (即先驗上認為發生率較低)。
    -   在本次試驗中，共 40 位受試者，其中有 6 位出現不良反應。
    -   安全閾值為 0.2。
2.  **計算先驗勝算 (Prior Odds)：** 計算在考慮數據前，H1 相對於 H2 的勝算。
3.  **更新後驗分佈：** 根據觀測數據，更新 Beta 分佈的參數。
4.  **計算後驗勝算 (Posterior Odds)：** 計算在看到數據後，H1 相對於 H2 的勝算。
5.  **計算貝氏因子 (Bayes Factor)：** 計算後驗勝算與先驗勝算的比值。
6.  **解讀結果：** 在註解中解釋貝氏因子的意義。

# 程式碼與結果要求
- 程式碼需有清晰的中文註解，解釋貝氏推斷的每一步。
- 最終應印出先驗勝算、後驗勝算與貝氏因子。`
  },
  {
    id: 65,
    title: '貝氏溯源推斷：比較兩樣本來源',
    difficulty: '3. 進階應用',
    category: '統計檢定',
    uses: 295,
    likes: 158,
    description: '使用特徵基準的貝氏因子 (Feature-based Bayes Factor)，比較兩組連續數據（如法醫鑑識中的樣本）是否來自相同來源。',
    tags: ['R 語言', '貝氏統計', 'Bayes Factor', '法醫統計', '溯源推斷', '常態模型'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '在法醫科學、品質管制或考古學中，當您需要客觀量化兩組測量樣本（如玻璃碎片成分、墨水磁性）來自同一來源相對於不同來源的證據強度時，此方法非常適用。',
    usageInstructions: '請在 `# 1. 設定` 區塊中，設定您的**先驗分佈參數** (`prior_mean`, `prior_var`)，**數據變異數** (`sigma2`，假設已知)，以及兩組**觀測數據** (`control_data`, `recovered_data`)。',
    fullPrompt: `我是一名法醫文件鑑定人，需要分析一份可疑合約的第二頁是否被替換過。

# 我的背景資訊
- **研究目的：** 比較合約中具爭議的第二頁，其墨水磁通量是否與無爭議的第一、三頁來自同一台印表機。
- **假說：**
    - H1: 第二頁與第一、三頁由同一台印表機印出 (來源相同)。
    - H2: 第二頁由另一台不同的印表機印出 (來源不同)。
- **數據：** 我已測量了各頁面上多個點的墨水磁通量，數據呈常態分佈，且根據儀器規格，測量變異數已知。

# 我的任務
請提供 R 程式碼，使用貝氏因子來評估 H1 相對於 H2 的證據強度。

# 程式碼與結果要求
1.  **設定參數與數據：**
    -   根據大量參考數據，我們對印表機墨水磁通量的先驗信念為 N(17.5, 3.92^2)。
    -   儀器測量變異數為 0.24^2。
    -   **控制組數據 (第一、三頁):** \`x <- c(16, 15, 15, 16, 15, 16)\`
    -   **待測組數據 (第二頁):** \`y <- c(15, 16, 16)\`
2.  **更新控制組後驗分佈：** 根據控制組數據 \`x\` 更新先驗分佈，得到關於來源印表機參數的後驗分佈。
3.  **計算邊際概似：**
    -   計算在 H1 假說下，觀測到待測數據 \`y\` 的邊際概似 (即分子)。這是一個後驗預測分佈。
    -   計算在 H2 假說下，觀測到待測數據 \`y\` 的邊際概似 (即分母)。這是一個先驗預測分佈。
4.  **計算貝氏因子：** 將兩個邊際概似相除。
- 程式碼需有清晰的中文註解，並解釋後驗預測與先驗預測的概念。`
  },
    {
    id: 66,
    title: '貝氏計數資料檢定 (Poisson-Gamma 模型)',
    difficulty: '3. 進階應用',
    category: '統計檢定',
    uses: 265,
    likes: 138,
    description: '使用分數基準的貝氏因子 (Score-based Bayes Factor) 分析計數型數據，並使用 Poisson-Gamma 共軛模型進行推斷。',
    tags: ['R 語言', '貝氏統計', 'Bayes Factor', 'Poisson-Gamma', '法醫統計', '計數資料'],
    isFavorite: true,
    essentialRank: null,
    usageContext: '當您的證據是以計數形式呈現（例如：槍枝彈道比對的連續匹配刻線數、顯微鏡下的微量跡證數），且您想量化這些計數對於「相同來源」vs.「不同來源」假說的支持程度時，此模型特別有用。',
    usageInstructions: '請在 `# 1. 設定先驗參數` 區塊中，為相同來源 (H1) 與不同來源 (H2) 兩種情況，分別設定 Gamma 先驗分佈的形狀 (`alpha`) 與速率 (`beta`) 參數。並在 `observed_count` 中輸入您觀測到的計數值。',
    fullPrompt: `我正在分析一宗槍擊案的彈道比對證據。

# 我的背景資訊
- **研究目的：** 評估從犯罪現場找到的彈頭，是否由嫌疑人持有的槍枝所擊發。
- **證據形式：** 彈道比對的結果被量化為「連續匹配刻線數」(Consecutive Matching Striations, CMS)，這是一個計數型數據。
- **觀測值：** 本次比對觀測到 4 條連續匹配刻線。
- **假說：**
    - H1: 彈頭由嫌疑人的槍枝擊發 (相同來源)。
    - H2: 彈頭由另一把未知槍枝擊發 (不同來源)。

# 我的任務
請提供 R 程式碼，使用 Poisson-Gamma 貝氏模型來計算貝氏因子。

# 程式碼與結果要求
1.  **建立模型：**
    -   假設 CMS 計數遵循卜松分佈 (Poisson distribution)，其平均值 λ 未知。
    -   我們對 λ 的先驗信念使用 Gamma 分佈來描述 (此為卜松分佈的共軛先驗)。
2.  **設定先驗參數：**
    -   根據大量文獻，相同來源槍枝比對的 CMS 平均值 λ1，其先驗分佈為 Gamma(125, 32)。
    -   不同來源槍枝比對的 CMS 平均值 λ2，其先驗分佈為 Gamma(7, 5)。
3.  **計算邊際概似：**
    -   由於 Poisson-Gamma 是共軛的，其邊際分佈為負二項分佈 (Negative Binomial)。分別計算在 H1 和 H2 假說下，觀測到 4 條 CMS 的機率。
4.  **計算貝氏因子：** 將 H1 的邊際概似除以 H2 的邊際概似。
- 程式碼需有清晰的中文註解。`
  },
  {
    id: 67,
    title: '貝氏多類別分類 (Dirichlet-Multinomial)',
    difficulty: '3. 進階應用',
    category: '統計檢定',
    uses: 215,
    likes: 112,
    description: '將貝氏分析擴展至多於兩個類別的分類問題，使用 Dirichlet-Multinomial 共軛模型，計算觀測數據屬於特定類別的證據強度。',
    tags: ['R 語言', '貝氏統計', 'Bayes Factor', 'Dirichlet-Multinomial', '多類別分類', '法醫統計'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '當您的觀測數據可以被歸類到多個類別之一時（例如：根據化學成分將樣本分為 A, B, C 三種類型），此模型可以幫助您判斷該樣本最有可能屬於哪一類，並量化證據強度。',
    usageInstructions: '請在 `# 1. 設定` 區塊中，根據您的先驗知識為兩個假說分別設定 Dirichlet 分佈的 alpha 參數 (`alphas_H1`, `alphas_H2`)，並在 `observed_counts` 中輸入您在各類別觀測到的計數。',
    fullPrompt: `我正在分析槍擊殘跡 (Gunshot Residue, GSR) 的元素組成，以判斷其可能的彈藥來源。

# 我的背景資訊
- **研究目的：** 判斷一批 GSR 顆粒是來自 D 型彈藥還是 E 型彈藥。
- **數據形式：** GSR 顆粒被分為 6 種不同的化學類別，數據為各類別的顆粒計數。
- **觀測數據：** \`n <- c(18, 36, 2, 150, 38, 22)\`
- **假說：**
    - H1: GSR 來自 D 型彈藥。
    - H2: GSR 來自 E 型彈藥。

# 我的任務
請提供 R 程式碼，使用 Dirichlet-Multinomial 貝氏模型來計算貝氏因子，以評估 H1 相對於 H2 的證據強度。

# 程式碼與結果要求
1.  **建立模型：**
    -   假設各類別顆粒計數遵循多項式分佈 (Multinomial)，其各類別比例 θ 未知。
    -   我們對比例向量 θ 的先驗信念使用 Dirichlet 分佈 (此為多項式分佈的共軛先驗)。
2.  **設定先驗參數：**
    -   根據專家經驗，D 型彈藥各類別比例的先驗分佈為 Dirichlet(\`a1 <- c(13, 22.9, 1.12, 168, 22.9, 19.3)\`)。
    -   E 型彈藥各類別比例的先驗分佈為 Dirichlet(\`a2 <- c(5.59, 16.4, 0.331, 127, 57, 12.7)\`)。
3.  **計算邊際概似：**
    -   由於 Dirichlet-Multinomial 是共軛的，其邊際分佈 (Dirichlet-Multinomial distribution) 有已知的機率質量函數。
    -   使用 \`extraDistr\` 套件的 \`ddirmnom()\` 函數，分別計算在 H1 和 H2 假說下觀測到該組計數的機率。
4.  **計算貝氏因子：** 將 H1 的邊際概似除以 H2 的邊際概似。
- 請載入 \`extraDistr\` 套件並附上清晰的中文註解。`
  },
  {
    id: 68,
    title: 'k-Means 分群與 Silhouette 分析',
    difficulty: '2. 核心統計',
    category: '非監督式學習',
    uses: 450,
    likes: 210,
    description: '使用 k-Means 演算法對數據進行分群，並透過 Silhouette 分析來評估分群品質與決定最佳分群數。',
    tags: ['R 語言', 'k-Means', '分群', '非監督式學習', 'cluster', 'Silhouette'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '當您想從數據中自動找出潛在的群體結構，且沒有預先標籤時（例如：將病患根據多種生理指標分為不同亞群），k-Means 是最常用的非監督式學習方法。',
    usageInstructions: '請準備一個只包含數值變數的資料框，並記得先進行標準化 (`scale()`)。在 `kmeans()` 中設定您想嘗試的分群數 `k`。`cluster::silhouette()` 可用於評估分群結果。',
    fullPrompt: `我需要對一組沒有標籤的數據進行分群，並評估分群的效果。

# 我的背景資訊
- **研究目的：** 根據多項心理健康指標，將學生分為不同的群體，並找出最佳的分群數目。
- **資料集：** 假設有一個名為 \`students_data\` 的資料框，已完成標準化。
- **分析方法：** k-Means 分群演算法與 Silhouette 分析。

# 我的任務
請提供 R 程式碼，完成以下分析流程：
1.  **執行 k-Means：** 使用 \`kmeans()\` 函數，將數據分為 4 個群集。
2.  **視覺化分群結果：** 若數據維度較高，可先用 PCA 或 MDS 降維至二維，再用 \`ggplot2\` 繪製散佈圖，並用不同顏色標示各群集。
3.  **計算 Silhouette 分數：** 使用 \`cluster::silhouette()\` 函數計算每個樣本的 Silhouette 分數。
4.  **視覺化 Silhouette 分析：** 使用 \`plot()\` 函數繪製 Silhouette 圖，評估分群的品質。
5.  **尋找最佳 k 值：** (選做) 撰寫一個迴圈，計算不同 k 值 (例如 2 到 10) 的平均 Silhouette 分數，並找出分數最高的 k 值。

# 程式碼與結果要求
- 請載入 \`cluster\` 和 \`ggplot2\` 套件。
- 程式碼需有清晰的中文註解，解釋 k-Means 與 Silhouette 分析的步驟及結果判讀。`
  },
  {
    id: 69,
    title: '關聯規則探勘 (Apriori 演算法)',
    difficulty: '3. 進階應用',
    category: '非監督式學習',
    uses: 320,
    likes: 180,
    description: '使用 Apriori 演算法，從交易型數據中挖掘有趣的關聯規則，並學習解讀 Support, Confidence, Lift 等關鍵指標。',
    tags: ['R 語言', '關聯規則', 'Apriori', 'arules', '購物籃分析', '非監督式學習'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '當您想從大量交易紀錄中找出項目之間的關聯性時（例如：超市的購物籃分析、犯罪模式分析、藥物併用模式），關聯規則探勘是強大的工具。',
    usageInstructions: '請先將您的資料轉換為 `transactions` 物件格式。在 `apriori()` 函數中設定 `support` 和 `confidence` 的最小閾值來控制挖掘出的規則數量。',
    fullPrompt: `我正在分析一個犯罪紀錄資料庫，希望找出不同犯罪特徵之間的關聯模式。

# 我的背景資訊
- **研究目的：** 使用關聯規則探勘，找出兇殺案中「兇手與被害人關係」、「使用武器」和「兇手年齡」之間的潛在規則。
- **資料集：** 假設已將資料前處理成一個 \`transactions\` 物件。

# 我的任務
請提供 R 程式碼，使用 \`arules\` 和 \`arulesViz\` 套件完成以下分析：
1.  **執行 Apriori 演算法：** 使用 \`apriori()\` 函數，設定合理的 support (0.001) 和 confidence (0.5) 閾值來挖掘規則。
2.  **檢視規則：** 使用 \`inspect()\` 函數，查看挖掘出的前幾條規則，並根據 "lift" 指標排序。
3.  **視覺化規則：**
    -   使用 \`plot()\` 函數繪製規則的散佈圖 (scatterplot)。
    -   使用 \`plot(method="graph")\` 將規則視覺化為網路圖。

# 程式碼與結果要求
- 請載入 \`arules\` 和 \`arulesViz\` 套件。
- 程式碼需有清晰的中文註解，解釋 support, confidence, lift 的意義，以及如何解讀圖表。`
  },
  {
    id: 70,
    title: '處理不平衡數據：SMOTE 演算法',
    difficulty: '2. 核心統計',
    category: '資料匯入與清洗',
    uses: 990,
    likes: 550,
    description: '當您的分類任務中，正負樣本比例懸殊時（如罕見疾病預測），使用 SMOTE 演算法來合成新的少數類樣本，以改善模型效能。',
    tags: ['R 語言', '不平衡數據', 'SMOTE', '過採樣', '資料前處理', 'themis'],
    isFavorite: true,
    essentialRank: null,
    usageContext: '在許多臨床研究中，病患組的樣本數遠少於健康對照組。在這種情況下直接訓練模型，會導致模型偏向多數類。SMOTE 是解決此問題的常用且有效的方法。',
    usageInstructions: '請安裝 `themis` 套件 (為 `tidymodels` 框架的一部分)。在 `recipe` 中加入 `step_smote()`，並設定 `over_ratio` 參數來決定要生成多少新的少數類樣本。**注意：SMOTE 應只在訓練集上執行，以避免資訊洩漏 (information leakage)。**',
    fullPrompt: `我正在建立一個疾病預測模型，但我的訓練數據中病患樣本（正例）遠少於健康樣本（負例），導致模型效能不佳。

# 我的背景資訊
- **研究目的：** 使用 SMOTE (Synthetic Minority Over-sampling Technique) 演算法來處理類別不平衡問題。
- **資料集：** 一個包含結果變數 ('outcome') 和多個預測變數的訓練集 \`train_data\`。

# 我的任務
請提供一段 R 程式碼，使用 \`themis\` 套件 (搭配 \`tidymodels\` 框架) 來執行 SMOTE。

# 程式碼與結果要求
1.  **載入套件：** 載入 \`tidymodels\` 和 \`themis\`。
2.  **建立 Recipe：** 建立一個 \`recipe\` 物件，定義模型公式。
3.  **加入 SMOTE 步驟：** 在 recipe 中加入 \`step_smote()\`，並設定目標是將少數類的樣本數增加到與多數類相當 (\`over_ratio = 1\`)。
4.  **應用 Recipe：** 將 recipe "prep" 並 "bake" 到訓練數據上，生成一個新的、平衡的訓練集。
5.  **驗證結果：** 使用 \`table()\` 函數，比較處理前後訓練集中類別的比例。

- 程式碼需有清晰的中文註解，解釋為何 SMOTE 應該在交叉驗證的每一個摺疊 (fold) 內部分別執行，以避免資料洩漏。`
  },
  {
    id: 71,
    title: '時間序列分類：DTW + k-NN',
    difficulty: '3. 進階應用',
    category: '時間序列分析',
    uses: 360,
    likes: 190,
    description: '結合動態時間扭曲 (DTW) 作為距離度量，與 k-最近鄰 (k-NN) 演算法，對長度不同且可能存在時間軸偏移的時間序列數據（如感測器訊號）進行分類。',
    tags: ['R 語言', '時間序列', 'DTW', 'k-NN', '分類', 'dtw'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '當您需要比較或分類一些波形數據，例如 ECG 訊號、步態分析、或手勢辨識時，這些數據的關鍵特徵在於形狀而非絕對時間點。DTW 能夠有效地比較這些形狀相似但時間上不完全對齊的序列。',
    usageInstructions: '請安裝 `dtw` 套件。您需要先計算查詢序列與所有訓練序列之間的 DTW 距離，然後找出距離最近的 k 個鄰居，並以其類別的多數決作為預測結果。',
    fullPrompt: `我正在進行一項手勢辨識研究，需要對穿戴式裝置收集到的加速度計時間序列數據進行分類。

# 我的背景資訊
- **研究目的：** 辨識不同的手勢，但每個手勢的執行速度和長度都略有不同。
- **分析方法：** 使用動態時間扭曲 (DTW) 作為距離度量，並結合 k-最近鄰 (k-NN) 分類器。

# 我的任務
請提供 R 程式碼，演示以下流程：
1.  **資料準備：** 建立兩個不同長度的範例時間序列 (\`query_seq\` 和 \`reference_seq\`)。
2.  **計算 DTW 距離：** 使用 \`dtw::dtw()\` 函數計算兩個序列之間的 DTW 距離。
3.  **視覺化對齊：** 使用 \`plot()\` 函數視覺化 DTW 演算法如何將兩個序列進行非線性對齊。
4.  **k-NN 分類流程：** 撰寫一個簡化的 k-NN 函數或迴圈，對於一個新的查詢序列，計算其與訓練集中所有序列的 DTW 距離，並找出最近鄰居的類別作為預測結果。

# 程式碼與結果要求
- 程式碼需有清晰的中文註解，解釋 DTW 的原理以及如何將其應用於 k-NN 分類。`
  },
  {
    id: 72,
    title: '多使用者驗證：Leave-One-User-Out 交叉驗證',
    difficulty: '3. 進階應用',
    category: '進階統計模型',
    uses: 510,
    likes: 300,
    description: '評估模型對於「全新使用者」的泛化能力。在每次迭代中，將一位使用者的所有數據作為測試集，其餘使用者的數據作為訓練集。',
    tags: ['R 語言', '交叉驗證', '使用者獨立模型', '泛化能力', '臨床數據'],
    isFavorite: true,
    essentialRank: null,
    usageContext: '在開發穿戴式裝置或任何個人化模型時，傳統的隨機交叉驗證會高估模型表現。Leave-One-User-Out 交叉驗證能更真實地模擬模型在從未見過的新使用者身上的表現，對於評估模型的真實泛化能力至關重要。',
    usageInstructions: '您需要一個包含**使用者 ID** 欄位的資料框。撰寫一個迴圈，迭代所有唯一的使用者 ID。在迴圈內部，根據當前的 ID 將資料分割為訓練集與測試集，然後訓練並評估模型。',
    fullPrompt: `我正在開發一個基於穿戴式裝置數據的活動辨識模型，需要評估模型對新使用者的表現。

# 我的背景資訊
- **研究目的：** 使用 Leave-One-User-Out (LOOCV-User) 交叉驗證來評估模型的泛化能力。
- **資料集：** 一個名為 \`activity_data\` 的資料框，包含 'userid', 'activity_label' 以及多個感測器特徵欄位。

# 我的任務
請提供 R 程式碼，演示 Leave-One-User-Out 交叉驗證的完整流程：
1.  **取得使用者列表：** 從資料框中獲取所有唯一的使用者 ID。
2.  **建立迭代迴圈：** 建立一個 \`for\` 迴圈，或使用 \`purrr::map\`，對每一個使用者 ID 進行迭代。
3.  **分割資料：** 在迴圈的每一次迭代中：
    -   將當前使用者的所有數據設為**測試集**。
    -   將所有其他使用者的數據設為**訓練集**。
4.  **訓練與評估：** 在迴圈中訓練模型 (例如，隨機森林)，並在測試集上進行預測，最後儲存該次迭代的準確率。
5.  **計算總體表現：** 迴圈結束後，計算所有迭代的平均準確率，作為模型的最終使用者獨立表現指標。

# 程式碼與結果要求
- 程式碼需有清晰的中文註解。
- 最終應印出每個使用者的測試準確率，以及整體的平均準確率。`
  },
  {
    id: 73,
    title: '異常偵測：孤立森林 (Isolation Forest)',
    difficulty: '3. 進階應用',
    category: '非監督式學習',
    uses: 400,
    likes: 220,
    description: '使用孤立森林演算法來偵測數據中的異常點或離群值。此方法在高維數據中表現高效，且不需要數據呈特定分佈。',
    tags: ['R 語言', '異常偵測', '離群值', '孤立森林', '非監督式學習', 'solitude'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '在臨床監測、金融詐欺偵測或儀器故障預警等情境中，目標是找出與大多數數據行為模式不同的「異常」觀測值。孤立森林透過假設異常點更容易被孤立的原理來有效偵測它們。',
    usageInstructions: '請安裝 `solitude` 或 `isotree` 套件。您只需要將您的特徵資料框傳入模型進行訓練。模型會為每個觀測值計算一個異常分數，分數越高，代表其為異常點的可能性越大。',
    fullPrompt: `我需要從一個數據集中找出異常或罕見的觀測值。

# 我的背景資訊
- **研究目的：** 偵測魚類不正常的移動軌跡。
- **分析方法：** 使用孤立森林 (Isolation Forest) 演算法，這是一種高效的非監督式異常偵測方法。
- **資料集：** 一個名為 \`fish_trajectories\` 的資料框，包含了多個從軌跡中提取出的特徵 (如平均速度、轉彎角度等)。

# 我的任務
請提供 R 程式碼，使用 \`solitude\` 套件來訓練一個孤立森林模型並進行預測。

# 程式碼與結果要求
1.  **載入套件與資料。**
2.  **建立與訓練模型：** 使用 \`isolationForest$new()\` 建立一個模型物件，然後使用 \`$fit()\` 方法來訓練模型。
3.  **預測異常分數：** 使用 \`$predict()\` 方法為新的數據點計算異常分數。分數範圍介於 0 到 1 之間。
4.  **解讀與視覺化：**
    -   解釋異常分數的意義 (分數越高越可能為異常)。
    -   繪製異常分數的直方圖，以幫助選擇一個合適的閾值來定義何謂「異常」。
    -   根據選定的閾值，找出資料集中的異常觀測值。

- 程式碼需有清晰的中文註解。`
  },
  {
    id: 74,
    title: 'DCE 實驗設計 (無標籤, rotation.design)',
    difficulty: '3. 進階應用',
    category: '離散選擇實驗 (DCE)',
    uses: 350,
    likes: 180,
    description: '使用 `support.CEs` 套件的 `rotation.design` 函數，快速生成一個正交的、無標籤 (unlabeled) 的 DCE 實驗設計。',
    tags: ['R 語言', 'DCE', '實驗設計', 'support.CEs', 'rotation.design'],
    isFavorite: true,
    essentialRank: null,
    usageContext: '當您需要為 Discrete Choice Experiment (DCE) 建立選擇題組，且每個選項的標題是通用的（例如「方案A」、「方案B」）時，`rotation.design` 提供了一種基於正交陣列的快速生成方法。',
    usageInstructions: '請在 `attribute.names` 的 `list()` 中，定義您研究中的所有**屬性 (attributes)** 及其對應的**水平 (levels)**。透過 `nalternatives` 設定每個選擇題的選項數，`nblocks` 設定問卷版本數。',
    fullPrompt: `我正在使用 R 語言進行一個離散選擇實驗 (Discrete Choice Experiment, DCE) 的研究，需要建立實驗設計。

# 我的背景資訊
- **研究目的：** 了解消費者對植物肉產品的偏好。
- **分析工具：** 我希望使用 \`support.CEs\` 套件來生成一個**無標籤 (unlabeled)** 的實驗設計。

# 我的任務
請提供 R 程式碼，使用 \`support.CEs::rotation.design()\` 函數完成以下任務：
1.  **定義屬性與水平：** 建立一個包含以下六個屬性及其水平的實驗設計：
    -   Additives: "Without", "With"
    -   Nutrition: "25g", "40g"
    -   Format: "Raw", "Ready"
    -   Carbon: "No", "20%"
    -   Vegan: "No", "Yes"
    -   Price: "3.5", "4.5", "6.0"
2.  **生成設計：**
    -   每個選擇題組 (choice set) 包含 2 個選項。
    -   將整個實驗設計分為 3 個問卷版本 (blocks)。
    -   設定隨機種子以確保結果可重複。

# 程式碼與結果要求
- 請載入 \`support.CEs\` 套件。
- 程式碼需有清晰的中文註解，解釋各參數的意義。
- 最終印出生成的實驗設計物件。`
  },
  {
    id: 75,
    title: 'DCE 實驗設計 (有標籤, Lma.design)',
    difficulty: '3. 進階應用',
    category: '離散選擇實驗 (DCE)',
    uses: 290,
    likes: 150,
    description: '使用 `support.CEs` 套件的 `Lma.design` 函數，生成一個有標籤 (labeled) 的 DCE 實驗設計，其中特定屬性作為選項標籤。',
    tags: ['R 語言', 'DCE', '實驗設計', 'support.CEs', 'Lma.design', 'labeled design'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '當您的 DCE 選擇題組中的選項本身帶有特定意義或品牌（例如「方案A：搭乘高鐵」、「方案B：搭乘飛機」）時，應使用有標籤設計。此指令將一個屬性（如品牌）提升為選項標籤。',
    usageInstructions: '請將作為標籤的屬性**從 `attribute.names` 列表中移除**，其水平數量將自動對應到 `nalternatives`。其餘的通用屬性則保留在列表中。',
    fullPrompt: `我需要為我的離散選擇實驗 (DCE) 建立一個**有標籤 (labeled)** 的實驗設計。

# 我的背景資訊
- **研究目的：** 比較消費者在「有無添加物」這兩種植物肉產品之間的選擇偏好。
- **設計需求：** 我希望將「添加物」這個屬性作為選項的標籤 (例如，選項一是 "有添加物產品"，選項二是 "無添加物產品")，而其他屬性（營養、價格等）則在這兩個選項下變化。
- **分析工具：** 我希望使用 \`support.CEs\` 套件。

# 我的任務
請提供 R 程式碼，使用 \`support.CEs::Lma.design()\` 函數完成以下任務：
1.  **定義通用屬性：** 建立一個列表，包含除了「添加物」以外的其他五個屬性及其水平。
2.  **生成設計：**
    -   每個選擇題組包含 2 個選項 (對應「有添加物」和「無添加物」)。
    -   生成一個問卷版本 (nblocks = 1)。
    -   設定隨機種子以確保結果可重複。

# 程式碼與結果要求
- 請載入 \`support.CEs\` 套件。
- 程式碼需有清晰的中文註解。
- 最終印出的實驗設計物件中，選項 (ALT) 應有 1 和 2，分別對應兩個標籤。`
  },
  {
    id: 76,
    title: 'DCE 效率設計 (D-efficient) (idefix)',
    difficulty: '3. 進階應用',
    category: '離散選擇實驗 (DCE)',
    uses: 320,
    likes: 190,
    description: '使用 `idefix` 套件，根據先驗參數分佈生成一個 D-efficient 的 DCE 實驗設計，以最大化資訊量並減少所需樣本數。',
    tags: ['R 語言', 'DCE', '實驗設計', 'idefix', 'D-efficient', 'MNL', 'Bayesian design'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '相較於傳統的正交設計，效率設計 (Efficient Design) 在統計上更有效率，尤其當您對參數的可能方向（正或負）有先驗知識時。`idefix` 能生成適用於多項式 Logit (MNL) 模型的 D-efficient 或 Bayesian D-efficient 設計。',
    usageInstructions: '請在 `Profiles()` 中定義您的屬性與水平。關鍵步驟是設定先驗參數的分佈 (`mu` 和 `sigma`)，這通常來自文獻回顧或先導研究。如果沒有先驗資訊，可以假設均值為 0。在 `Modfed()` 中設定選擇題數 (`n.sets`) 與選項數 (`n.alts`)。',
    fullPrompt: `我需要為我的離散選擇實驗 (DCE) 建立一個統計上更有效率的實驗設計。

# 我的背景資訊
- **研究目的：** 建立一個 D-efficient 的實驗設計，以提高後續模型估計的精確度。
- **分析工具：** 我希望使用 \`idefix\` 套件。
- **先驗資訊：** 根據文獻，我知道某些屬性可能對消費者的選擇有正面影響，某些則有負面影響。我希望將這些先驗資訊納入設計中。

# 我的任務
請提供 R 程式碼，使用 \`idefix\` 套件生成一個包含 opt-out 選項的 D-efficient 設計。

# 程式碼與結果要求
1.  **建立所有可能的選項：** 使用 \`Profiles()\` 函數，根據屬性與水平定義，生成一個包含所有可能組合的候選集。
2.  **設定先驗參數：** 建立一個均值向量 (\`mu\`) 和變異數-共變異數矩陣 (\`sigma\`) 來描述參數的先驗分佈。
3.  **生成設計：** 使用 \`Modfed()\` 函數從候選集中抽樣，以產生一個 D-efficient 的設計。
    -   設定總共 12 個選擇題組 (\`n.sets=12\`)。
    -   每個題組有 2 個選項加上 1 個 opt-out 選項 (\`n.alts=2\`, \`no.choice=TRUE\`)。
4.  **解碼設計：** (選做) 使用 \`Decode()\` 函數將數字編碼的設計轉換為易於閱讀的文字格式。
- 請附上清晰的中文註解。`
  },
  {
    id: 77,
    title: 'DCE 資料分析 (條件 Logit 模型)',
    difficulty: '2. 核心統計',
    category: '離散選擇實驗 (DCE)',
    uses: 480,
    likes: 290,
    description: '使用 `survival` 套件的 `clogit()` 函數，對 DCE 選擇數據擬合一個條件 Logit (Multinomial Logit, MNL) 模型，估計各屬性的偏好係數。',
    tags: ['R 語言', 'DCE', 'clogit', 'MNL', '條件 Logit', '迴歸分析'],
    isFavorite: true,
    essentialRank: null,
    usageContext: '這是分析 DCE 數據最經典的方法。當您的數據整理成每個選項佔一列的「長格式」後，`clogit()` 函數可以估計出每個屬性水平相對於參考水平的偏好程度。',
    usageInstructions: '請先使用 `support.CEs::make.dataset()` 或手動將您的資料整理成長格式。在 `clogit()` 的公式中，`RES` 是您的 0/1 選擇結果變數，`strata(STR)` 是用來標示每個獨立選擇題組的 ID。',
    fullPrompt: `我已經完成了離散選擇實驗 (DCE) 的數據收集，現在需要對數據進行分析。

# 我的背景資訊
- **研究目的：** 估計消費者對於不同植物肉屬性（如添加物、營養、價格）的偏好係數。
- **分析模型：** 我希望使用最經典的條件 Logit 模型 (Conditional Logit Model)，又稱多項式 Logit 模型 (Multinomial Logit, MNL)。
- **資料格式：** 我已經使用 \`support.CEs\` 套件將數據整理成適用於 \`clogit()\` 的長格式資料框，名為 \`dataset2\`。

# 我的任務
請提供 R 程式碼，使用 \`survival\` 套件的 \`clogit()\` 函數來擬合模型。

# 程式碼與結果要求
1.  **擬合模型：** 撰寫 \`clogit()\` 的公式，應包含：
    -   應變數：選擇結果 (\`RES\`)。
    -   自變數：所有屬性水平的 dummy variable，以及連續變數 (如 \`Price\`)，和一個代表非 opt-out 選項的截距項 (\`ASC\`)。
    -   分層變數：使用 \`strata()\` 函數，指定用來區分不同選擇題組的 ID 欄位 (\`STR\`)。
2.  **檢視結果：** 使用 \`summary()\` 函數顯示模型估計結果。
3.  **解讀結果：** 在註解中簡要說明如何解讀係數 (coef) 的正負號、p-value (P) 的意義。
- 請載入 \`survival\` 套件。`
  },
  {
    id: 78,
    title: 'DCE 結果分析：計算願付價值 (WTP)',
    difficulty: '3. 進階應用',
    category: '離散選擇實驗 (DCE)',
    uses: 410,
    likes: 260,
    description: '在 `clogit` 模型分析後，使用 `support.CEs` 套件的 `mwtp()` 函數，計算各非貨幣屬性相對於貨幣屬性的邊際願付價值 (WTP)。',
    tags: ['R 語言', 'DCE', 'WTP', '願付價值', 'mwtp', 'clogit'],
    isFavorite: true,
    essentialRank: null,
    usageContext: 'WTP 是 DCE 分析中最具政策與商業意涵的結果之一。它將消費者對抽象屬性（如「環保」、「無添加」）的偏好，量化為具體的貨幣價值，例如「消費者願意為無添加物的產品多付多少錢？」。',
    usageInstructions: '請將您擬合好的 `clogit` 模型物件傳入 `mwtp()` 的 `output` 參數。在 `monetary.variables` 中指定您的**價格/成本變數名稱**，並在 `non-monetary.variables` 中指定所有您想計算 WTP 的**其他屬性水平名稱**。',
    fullPrompt: `我已經完成了 DCE 的條件 Logit 模型分析，得到了各個屬性的偏好係數。現在，我需要進一步計算各個非貨幣屬性的邊際願付價值 (Marginal Willingness-to-Pay, MWTP)。

# 我的背景資訊
- **研究目的：** 將消費者對「無添加物」、「高營養」等屬性的偏好，轉化為具體的金錢價值。
- **模型物件：** 我有一個名為 \`clogout1\` 的 \`clogit\` 模型結果物件。
- **貨幣屬性：** 模型中的價格變數名為 \`Price\`。

# 我的任務
請提供 R 程式碼，使用 \`support.CEs\` 套件的 \`mwtp()\` 函數來計算 WTP。

# 程式碼與結果要求
1.  **執行 WTP 計算：**
    -   呼叫 \`mwtp()\` 函數。
    -   在 \`output\` 參數中傳入模型物件 \`clogout1\`。
    -   在 \`monetary.variables\` 中指定價格變數。
    -   在 \`non-monetary.variables\` 中指定所有非價格屬性水平的變數名稱。
    -   設定信賴區間的水平 (\`confidence.level\`)。
2.  **解讀結果：** 在註解中簡要說明輸出結果中 WTP 估計值的意義。

- 請載入 \`support.CEs\` 套件。`
  },
  {
    id: 79,
    title: 'DCE 結果視覺化：係數與相對重要性',
    difficulty: '2. 核心統計',
    category: '離散選擇實驗 (DCE)',
    uses: 380,
    likes: 210,
    description: '使用 ggplot2 將 DCE 模型的偏好係數或相對重要性（透過指數轉換）繪製成長條圖，以利結果呈現與報告。',
    tags: ['R 語言', 'DCE', 'ggplot2', '視覺化', '模型結果', '係數圖'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '相較於冰冷的數字表格，長條圖能更直觀地呈現不同屬性對消費者選擇的影響方向與強度，是學術報告與簡報中不可或缺的視覺化元素。',
    usageInstructions: '請先從您的 `clogit` 模型物件中提取係數 (`coef()`)。您可以直接繪製係數本身，或先用 `exp()` 轉換為相對重要性再繪圖。',
    fullPrompt: `我已經完成了 DCE 的模型分析，得到了各屬性的偏好係數，我希望將這些結果視覺化，以便在論文或簡報中呈現。

# 我的背景資訊
- **研究目的：** 繪製長條圖，直觀地比較不同屬性水平對消費者選擇的影響力。
- **模型物件：** 我有一個名為 \`clogit_model\` 的 \`clogit\` 模型結果物件。

# 我的任務
請提供 R 程式碼，使用 \`ggplot2\` 完成以下兩種視覺化任務：
1.  **繪製係數圖 (Coefficient Plot)：** 直接將模型係數繪製成長條圖。Y 軸為係數大小，X 軸為各屬性水平。
2.  **繪製相對重要性圖 (Relative Importance Plot)：**
    -   首先，將所有非貨幣屬性的係數進行指數轉換 (\`exp(coefs)\`)，得到其相對重要性。
    -   將轉換後的相對重要性繪製成長條圖。

# 程式碼與結果要求
- 請載入 \`ggplot2\` 套件。
- 程式碼需有清晰的中文註解。
- 圖表應包含專業的中文標題與座標軸標籤。`
  },
  {
    id: 80,
    title: 'LASSO 迴歸進行特徵篩選與模型正規化',
    difficulty: '3. 進階應用',
    category: '迴歸分析',
    uses: 350,
    likes: 210,
    description: '在高維度資料中（如基因體學），使用 LASSO (Least Absolute Shrinkage and Selection Operator) 迴歸，自動篩選重要變數並進行模型正規化，以避免過擬合。',
    tags: ['R 語言', 'LASSO', 'glmnet', '特徵篩選', '正規化', '高維度'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '當您的預測變數數量非常多，甚至超過樣本數時，傳統迴歸模型容易過擬合。LASSO 透過懲罰係數，能將不重要的變數係數縮減至零，達到特徵篩選的效果。',
    usageInstructions: '請安裝 `glmnet` 套件。將您的**預測變數矩陣** (`x`) 和**應變數向量** (`y`) 傳入 `cv.glmnet()`。`lambda.min` 和 `lambda.1se` 是交叉驗證找到的兩種最佳懲罰項，前者使誤差最小，後者是在誤差最小一個標準差內最簡潔的模型。',
    fullPrompt: `我正在處理一份高維度的基因表現數據，希望建立一個預測模型，同時找出哪些基因是最重要的預測因子。

# 我的背景資訊
- **研究目的：** 使用 LASSO 迴歸來建立預測模型並進行變數篩選。
- **資料：**
    - \`x\`: 一個包含數百個基因表現量的矩陣 (預測變數)。
    - \`y\`: 一個數值向量，代表病患的某項臨床結果 (應變數)。
- **挑戰：** 預測變數的數量遠大於樣本數，傳統的多元迴歸不適用。

# 我的任務
請提供 R 程式碼，使用 \`glmnet\` 套件執行 LASSO 迴歸。

# 程式碼與結果要求
1.  **載入套件與建立範例資料：** 建立一個高維度的模擬資料集。
2.  **執行交叉驗證：** 使用 \`cv.glmnet()\` 函數，透過交叉驗證來找到最佳的懲罰參數 lambda。
3.  **視覺化結果：** 繪製交叉驗證誤差隨 lambda 變化的圖 (\`plot(cv_model)\`)。
4.  **檢視係數：**
    -   顯示在最佳 lambda (\`lambda.min\`) 下，模型所選擇的非零係數。
    -   顯示在 "1-SE rule" (\`lambda.1se\`) 下，更簡潔模型的非零係數。
5.  **進行預測：** 演示如何使用擬合好的模型對新數據進行預測。

- 程式碼需有清晰的中文註解，解釋 LASSO 的原理與 \`lambda.min\` vs. \`lambda.1se\` 的選擇。`
  },
  {
    id: 81,
    title: '多重假說檢定校正 (Bonferroni & FDR)',
    difficulty: '2. 核心統計',
    category: '統計檢定',
    uses: 510,
    likes: 300,
    description: '當您同時執行大量假說檢定時（如基因晶片分析），使用 `p.adjust()` 函數對 p-value 進行校正，以控制偽陽性率 (False Positive Rate)。',
    tags: ['R 語言', '多重檢定', 'p.adjust', 'Bonferroni', 'FDR', 'FWER'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '在基因體學或任何高通量研究中，同時檢定上千個假說會大幅增加第一類型錯誤（偽陽性）的機率。多重檢定校正是確保研究結論穩健性的必要步驟。',
    usageInstructions: '請準備一個包含您所有原始 p-value 的**數值向量**。將此向量傳入 `p.adjust()` 函數，並透過 `method` 參數指定校正方法，如 `"bonferroni"` 或 `"BH"` (Benjamini-Hochberg FDR)。',
    fullPrompt: `我完成了一項基因表現差異分析，得到了上千個基因的 p-value，我需要對這些 p-value 進行多重檢定校正。

# 我的背景資訊
- **研究目的：** 在上千次 t-檢定後，控制整體的偽陽性錯誤率，以找出真正具有顯著差異的基因。
- **資料：** 一個名為 \`raw_p_values\` 的數值向量，包含 1000 個 p-value。

# 我的任務
請提供 R 程式碼，使用 R 的基礎函數 \`p.adjust()\` 對這組 p-value 進行校正。

# 程式碼與結果要求
1.  **建立範例數據：** 生成一個包含 1000 個模擬 p-value 的向量。
2.  **執行校正：**
    -   使用 \`p.adjust()\` 函數，並設定 \`method = "bonferroni"\` 進行 Bonferroni 校正。
    -   使用 \`p.adjust()\` 函數，並設定 \`method = "BH"\` (或 "fdr") 進行 Benjamini-Hochberg (FDR) 校正。
3.  **比較結果：**
    -   將原始 p-value、Bonferroni 校正後的 p-value 和 BH 校正後的 p-value 合併成一個 data frame。
    -   計算在 α = 0.05 的水準下，三種 p-value 分別有多少個顯著的結果。

- 程式碼需有清晰的中文註解，解釋 Bonferroni (控制 FWER) 和 BH (控制 FDR) 的基本原理與保守程度的差異。`
  },
  {
    id: 82,
    title: '模型選擇：比較模型的 AIC 與 BIC',
    difficulty: '3. 進階應用',
    category: '迴歸分析',
    uses: 420,
    likes: 250,
    description: '當您有多個候選迴歸模型時，使用 AIC (赤池資訊量準則) 或 BIC (貝氏資訊量準則) 來比較模型的擬合優度與複雜度，以選擇最適當的模型。',
    tags: ['R 語言', '模型選擇', 'AIC', 'BIC', '迴歸分析', 'lm'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '在建立迴歸模型時，加入過多不必要的變數會導致過擬合。AIC 和 BIC 是在模型的解釋力與簡潔性之間取得平衡的常用指標，數值越小代表模型越好。',
    usageInstructions: '請先分別建立您想比較的多個 `lm` 模型物件。然後將這些模型物件傳入 `AIC()` 或 `BIC()` 函數中，即可得到各模型的指標值以供比較。',
    fullPrompt: `我正在建立一個多元迴歸模型，對於要納入哪些預測變數有不同的理論假設，因此產生了數個候選模型。

# 我的背景資訊
- **研究目的：** 比較三個不同的線性迴歸模型，以找出哪個模型最能解釋 \`mtcars\` 資料集中的油耗 ('mpg')。
- **候選模型：**
    -   模型 1: \`mpg ~ wt\`
    -   模型 2: \`mpg ~ wt + hp\`
    -   模型 3: \`mpg ~ wt + hp + am\`

# 我的任務
請提供 R 程式碼，完成以下模型比較流程：
1.  **建立所有模型：** 分別使用 \`lm()\` 函數建立上述三個模型。
2.  **計算 AIC 與 BIC：**
    -   使用 \`AIC()\` 函數，一次傳入三個模型物件，比較它們的 AIC 值。
    -   使用 \`BIC()\` 函數，一次傳入三個模型物件，比較它們的 BIC 值。
3.  **解讀結果：** 根據 AIC 和 BIC 的結果，在註解中說明哪個模型是最佳選擇，並解釋 AIC 與 BIC 在懲罰模型複雜度上的差異。

# 程式碼與結果要求
- 程式碼需有清晰的中文註解。
- 最終應清楚呈現三個模型的 AIC 與 BIC 值，並說明如何根據這些值來選擇模型。`
  },
  {
    id: 83,
    title: '主成分分析 (PCA) 進階：雙標圖 (Biplot) 視覺化',
    difficulty: '3. 進階應用',
    category: '多變量繪圖',
    uses: 370,
    likes: 200,
    description: '在 PCA 分析後，使用 `factoextra` 套件繪製雙標圖 (Biplot)，同時呈現樣本 (Observations) 與原始變數 (Variables) 在新主成分空間中的分佈與關係。',
    tags: ['R 語言', 'PCA', '雙標圖', 'factoextra', '降維', '視覺化'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '在執行完 PCA 後，雙標圖是解讀主成分意義的強大工具。它能幫助您理解：1) 哪些樣本彼此相似；2) 哪些原始變數對主成分的貢獻最大；3) 原始變數之間的相關性。',
    usageInstructions: '請安裝 `factoextra` 套件。將您使用 `prcomp()` 得到的 PCA 結果物件傳入 `fviz_pca_biplot()` 函數。您可以透過 `geom` 參數控制樣本點的顯示方式，並使用 `col.var` 來美化變數向量的顏色。',
    fullPrompt: `我已經對我的數據進行了主成分分析 (PCA)，現在需要一種更進階的視覺化方法來同時呈現樣本和原始變數的關係。

# 我的背景資訊
- **研究目的：** 透過雙標圖 (Biplot) 來解讀 PCA 的結果，了解主成分的構成以及樣本的分佈。
- **資料集：** 使用 R 內建的 \`iris\` 資料集，只取其四個數值特徵。
- **PCA 結果：** 假設已執行 PCA 並將結果儲存在一個名為 \`pca_res\` 的物件中。

# 我的任務
請提供 R 程式碼，使用 \`factoextra\` 套件繪製一張專業的雙標圖。

# 程式碼與結果要求
1.  **載入套件與執行 PCA：** 載入 \`factoextra\`，並對 \`iris\` 資料集的 1-4 欄執行 PCA (記得要標準化)。
2.  **繪製雙標圖：** 使用 \`fviz_pca_biplot()\` 函數，並包含以下設定：
    -   根據鳶尾花的品種 ('Species') 為樣本點上色。
    -   加上橢圓形的信賴區間 (\`addEllipses = TRUE\`)。
    -   自訂圖例標題。
3.  **解讀圖表：** 在註解中簡要說明如何從雙標圖中解讀以下資訊：
    -   樣本點的聚集情況代表什麼。
    -   箭頭 (代表原始變數) 的長度和方向代表什麼。
    -   兩個箭頭之間的夾角代表什麼。

- 程式碼需有清晰的中文註解。`
  },
  {
    id: 84,
    title: "時間序列趨勢分析：Mann-Kendall 檢定與 Sen's 斜率",
    difficulty: '2. 核心統計',
    category: '時間序列分析',
    uses: 470,
    likes: 260,
    description: "使用非參數的 Mann-Kendall 檢定來偵測時間序列資料中的單調趨勢，並用 Sen's 斜率估計趨勢的大小，適用於非常態分佈數據。",
    tags: ['R 語言', '時間序列', 'Mann-Kendall', 'Sen\'s Slope', '趨勢分析', 'trend'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '當您需要分析具時間性的數據（例如：某地區逐年降雨量、病患的某項生理指標追蹤紀錄），並想判斷是否存在一個持續上升或下降的趨勢時，此方法非常有用，特別是當數據不符合常態分佈假設時。',
    usageInstructions: '請安裝並載入 `trend` 套件。將 `your_time_series_data` 替換成您的**數值向量**或**時間序列物件 (ts)**。程式碼將輸出檢定結果（p-value）與趨勢的斜率估計。',
    fullPrompt: `我正在分析一段長期的環境監測數據，需要使用 R 語言檢定其中是否存在統計上顯著的趨勢。

# 我的背景資訊
- **研究目的：** 判斷一個地區的年降雨量是否存在單調的上升或下降趨勢。
- **資料：** 一個名為 \`rainfall_data\` 的時間序列向量。
- **分析方法：** 由於數據可能不是常態分佈，我希望使用非參數的 Mann-Kendall 檢定。

# 我的任務
請提供 R 程式碼，使用 \`trend\` 套件完成以下分析：
1.  **執行 Mann-Kendall 檢定：** 使用 \`mk.test()\` 函數來檢定時間序列中是否存在趨勢。
2.  **估計趨勢幅度：** 使用 \`sens.slope()\` 函數來計算 Sen's 斜率，以量化趨勢的幅度 (例如，每年平均增加/減少多少單位)。
3.  **解讀結果：** 在註解中解釋如何根據 \`mk.test\` 的 p-value 和 \`sens.slope\` 的估計值來下結論。

# 程式碼與結果要求
- 請載入 \`trend\` 套件。
- 程式碼需有清晰的中文註解。
- 最終應呈現完整的檢定摘要與斜率估計。`
  },
  {
    id: 85,
    title: "K-Means 分群與 Elbow Method 決定最佳群數",
    difficulty: '2. 核心統計',
    category: '非監督式學習',
    uses: 680,
    likes: 390,
    description: '使用 K-Means 演算法將觀測值（如病患、站點）分群，並透過 Elbow Method 視覺化地輔助決定最佳分群數目 K。',
    tags: ['R 語言', 'K-Means', '分群', 'Elbow Method', 'cluster', '非監督式學習', 'factoextra'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '當您想根據多個連續變數，自動地將數據分成幾個有意義的群組時（例如：根據多種臨床指標對病患進行分型），K-Means 是最常用的方法之一。Elbow Method 則是一種輔助判斷「分幾群比較好」的視覺化工具。',
    usageInstructions: '請準備一個只包含**數值變數**的資料框，並務必在分群前使用 \`scale()\` 函數進行**標準化**。將此標準化後的資料傳入程式碼，它將幫助您繪製 Elbow 圖並執行分群。',
    fullPrompt: `我需要對一組觀測數據進行分群，以找出其中潛在的類別結構。

# 我的背景資訊
- **研究目的：** 根據 \`iris\` 資料集的四個數值特徵，將鳶尾花分為不同的群組，並找出最佳的分群數。
- **資料集：** 使用 R 內建的 \`iris\` 資料集。
- **分析方法：** K-Means 分群演算法與 Elbow Method。

# 我的任務
請提供 R 程式碼，使用 \`factoextra\` 套件完成以下流程：
1.  **資料準備：** 選取 \`iris\` 資料集中的數值欄位，並進行標準化。
2.  **尋找最佳 K 值：** 使用 \`fviz_nbclust()\` 函數，並設定 \`method = "wss"\` (Within-cluster Sum of Squares)，來繪製 Elbow Method 圖。
3.  **執行 K-Means：** 根據 Elbow Method 的建議，假設最佳 K 值為 3，使用 \`kmeans()\` 函數將數據分為 3 群。
4.  **視覺化分群結果：** 使用 \`fviz_cluster()\` 函數，將分群結果視覺化，並用不同顏色標示各群集。

# 程式碼與結果要求
- 請載入 \`factoextra\` 和 \`cluster\` 套件。
- 程式碼需有清晰的中文註解，解釋如何判讀 Elbow 圖以及如何視覺化最終的分群結果。`
  },
  {
    id: 86,
    title: "空間數據視覺化：在地圖上繪製點資料",
    difficulty: '3. 進階應用',
    category: '多變量繪圖',
    uses: 410,
    likes: 220,
    description: "使用 `ggplot2` 和 `sf` 套件，將帶有經緯度座標的數據（如病例發生地、環境監測站點）繪製在地圖上，並根據數值或類別變數進行著色。",
    tags: ['R 語言', '空間分析', '地圖', 'ggplot2', 'sf', '流行病學', 'GIS'],
    isFavorite: false,
    essentialRank: null,
    usageContext: '在流行病學、公共衛生或環境科學研究中，將數據點呈現在地理空間中是理解其分佈模式、發現群聚現象或評估環境暴露的關鍵第一步。',
    usageInstructions: '請安裝並載入 `ggplot2`, `sf` 和 `rnaturalearth` 套件。您需要一個包含**經度 (longitude)** 和**緯度 (latitude)** 欄位的資料框。程式碼將演示如何獲取世界地圖底圖，並將您的數據點疊加在地圖上。',
    fullPrompt: `我有一份包含地理座標的數據，希望將這些數據點繪製在地圖上，以視覺化其空間分佈。

# 我的背景資訊
- **研究目的：** 在世界地圖上標示出幾個主要城市的地理位置，並根據其人口數調整點的大小。
- **資料集：** 一個包含城市名稱、經度 (lon)、緯度 (lat) 和人口 (pop) 的資料框。

# 我的任務
請提供 R 程式碼，使用 \`ggplot2\` 和 \`sf\` 套件完成以下地圖繪製任務：
1.  **建立範例數據：** 建立一個包含數個世界主要城市座標與人口的 data frame。
2.  **獲取地圖底圖：** 使用 \`rnaturalearth\` 套件獲取世界地圖的 \`sf\` 物件。
3.  **繪製地圖：**
    -   使用 \`ggplot()\` 繪製地圖底圖 (\`geom_sf()\`)。
    -   使用 \`geom_point()\` 將城市數據點疊加在地圖上。
    -   將點的顏色對應到城市名稱，大小對應到人口數。
    -   設定地圖的座標範圍，以聚焦在特定區域。
    -   使用 \`theme_minimal()\` 並加上專業的標題。

# 程式碼與結果要求
- 請載入相關套件。
- 程式碼需有清晰的中文註解。
- 最終應生成一張清晰、資訊豐富的地圖。`
  },
  {
    id: 87,
    title: "階層式分群與樹狀圖視覺化 (hclust & dendrogram)",
    difficulty: "3. 進階應用",
    category: "非監督式學習",
    uses: 350,
    likes: 180,
    description: "使用階層式分群法對樣本（如病患、基因）進行分群，並繪製樹狀圖 (Dendrogram) 來視覺化其群集結構與關係。",
    tags: ['R 語言', '階層式分群', 'hclust', '樹狀圖', '非監督式學習', '熱力圖'],
    isFavorite: false,
    essentialRank: null,
    usageContext: "當您想探索數據的內在群集結構，且不知道應該分成幾群時，階層式分群是比 K-Means 更具探索性的方法。它不需要預先指定群數，而是產生一個完整的層級結構，讓您可以根據樹狀圖來決定切割點。",
    usageInstructions: "請準備一個只包含**數值變數**的資料框，並記得先進行**標準化 (`scale()`)**。程式碼將會先計算樣本間的距離矩陣 (`dist()`)，然後將此矩陣傳入 `hclust()` 函數進行分群。最後使用 `plot()` 函數將結果繪製成樹狀圖。",
    fullPrompt: `我需要對一組觀測數據進行階層式分群，以探索其潛在的群體結構。

# 我的背景資訊
- **研究目的：** 根據美國各州的犯罪率數據，找出哪些州在犯罪模式上彼此相似。
- **資料集：** 使用 R 內建的 \`USArrests\` 資料集。
- **分析方法：** 階層式聚合分群 (Hierarchical Agglomerative Clustering)。

# 我的任務
請提供 R 程式碼，完成以下分析流程：
1.  **資料準備：** 對 \`USArrests\` 資料集進行標準化，以避免不同單位變數的影響。
2.  **計算距離矩陣：** 使用 \`dist()\` 函數，計算樣本間的歐幾里得距離。
3.  **執行階層式分群：** 使用 \`hclust()\` 函數，並採用 "complete" linkage method 來進行分群。
4.  **視覺化樹狀圖：** 使用 \`plot()\` 函數將 \`hclust\` 的結果繪製成樹狀圖 (Dendrogram)。
5.  **解讀與切割：** 在圖上使用 \`rect.hclust()\` 函數，根據視覺判斷，將樹狀圖切割成 3 個群組並用方框標示出來。

# 程式碼與結果要求
- 程式碼需有清晰的中文註解，解釋從距離計算到分群與視覺化的完整流程。
- 樹狀圖應有清楚的標籤與標題。`
  },
  {
    id: 88,
    title: '使用 depmixS4 建立高斯混合模型 (GMM)',
    difficulty: '3. 進階應用',
    category: '非監督式學習',
    uses: 480,
    likes: 210,
    description: '對單變量連續數據擬合高斯混合模型，以識別潛在的子群體，並使用 AIC/BIC 選擇最佳組分數。',
    tags: ['R 語言', '混合模型', 'GMM', 'depmixS4', '非監督式學習', 'AIC', 'BIC'],
    isFavorite: true,
    essentialRank: null,
    usageContext: '當您懷疑您的數據是由多個不同的常態分佈群體混合而成時（例如，快速反應者與慢速反應者、兩種不同的疾病亞型），GMM 能幫助您識別並量化這些潛在的子群體。',
    usageInstructions: '請將 `speed1$RT` 替換成您的**數值向量**。您可以修改迴圈中的 `nstates` 範圍，以測試不同數量的潛在群體。',
    fullPrompt: `我正在分析一組反應時間 (RT) 數據，數據分佈呈現多峰性，我懷疑這是由多種不同的反應策略（例如，快猜與慢思）混合而成。

# 我的背景資訊
- **研究目的：** 使用高斯混合模型 (Gaussian Mixture Model) 來識別潛在的反應策略群體，並確定最佳的群體數量。
- **資料集：** 使用 \`hmmr\` 套件中的 \`speed1\` 資料集，其中的 \`RT\` 變數。

# 我的任務
請提供 R 程式碼，使用 \`depmixS4\` 套件完成以下分析：
1.  **模型擬合：** 分別擬合 1 到 4 個成分 (components) 的高斯混合模型。
2.  **模型比較：** 計算每個模型的 AIC 和 BIC，以找出最適當的模型。
3.  **結果摘要：** 顯示最佳模型的參數估計（各群體的平均值、標準差與比例）。`
  }
];
