
import React, { useState } from 'react';
import { LightBulbIcon, PaperAirplaneIcon, CodeBracketIcon, ChatBubbleLeftRightIcon, BeakerIcon, ChartBarIcon, CheckIcon } from './icons';

const PopularDirectionCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="bg-white p-4 rounded-lg border border-slate-200 flex items-center gap-4 hover:shadow-sm transition-shadow">
        <div className="bg-slate-100 p-2 rounded-full">
            {icon}
        </div>
        <div>
            <h4 className="font-semibold text-slate-700">{title}</h4>
            <p className="text-sm text-slate-500">{description}</p>
        </div>
    </div>
);


const PromptWishlist: React.FC = () => {
    const [wishText, setWishText] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!wishText) return;

        setIsSubmitting(true);
        setTimeout(() => {
            console.log({ wishText, email });
            setIsSubmitting(false);
            setIsSubmitted(true);
            setWishText('');
            setEmail('');
            setTimeout(() => setIsSubmitted(false), 3000);
        }, 1000);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold">許下您的願望</h1>
                <p className="mt-2 opacity-90">告訴我們您需要什麼樣的 R 語言提示詞</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md -mt-8">
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 text-sm text-blue-800 mb-6 rounded-r-md">
                    <p><strong>提示：</strong> 如果您有 PDF 檔，可以直接寄到 <a href="mailto:vivia.chung@gmail.com" className="font-semibold underline hover:text-blue-600">vivia.chung@gmail.com</a> 讓我們為您客製化最適合的提示詞！</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="wish-text" className="block text-sm font-medium text-slate-700 mb-2">
                            您的願望 <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="wish-text"
                            rows={5}
                            value={wishText}
                            onChange={(e) => setWishText(e.target.value)}
                            className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="例如：我希望有一個專門用於兩獨立樣本 t-檢定 (Independent Samples t-test)的提示詞，能夠比較兩種不同療法（例如：實驗組 vs. 對照組）對某個連續型結果指標（例如：血壓、住院天數）的影響。"
                            required
                        />
                        <p className="text-xs text-slate-500 mt-2">請盡量詳細描述您的需求，這樣我們才能更好地理解您的期待。</p>
                    </div>

                    <div className="mb-8">
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                            您的 Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="請輸入您的 Email，方便我們聯繫與通知"
                        />
                        <p className="text-xs text-slate-500 mt-2">填寫 Email 可在提示詞完成時收到通知。</p>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || !wishText}
                        className={`w-full flex items-center justify-center px-4 py-3 rounded-md font-semibold text-white transition-all duration-300 ${
                            isSubmitting
                                ? 'bg-slate-400 cursor-not-allowed'
                                : isSubmitted
                                ? 'bg-green-500'
                                : 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                        }`}
                    >
                        {isSubmitting ? (
                            '提交中...'
                        ) : isSubmitted ? (
                            <>
                                <CheckIcon className="w-5 h-5 mr-2" />
                                願望已提交！
                            </>
                        ) : (
                            <>
                                <PaperAirplaneIcon className="w-5 h-5 mr-2" />
                                提交願望
                            </>
                        )}
                    </button>
                </form>
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-bold text-slate-800 mb-1 flex items-center">
                    <LightBulbIcon className="w-6 h-6 mr-3 text-amber-500" />
                    熱門許願方向
                </h2>
                <p className="text-slate-500 mb-6">參考這些範例，讓您的許願更具體。</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PopularDirectionCard 
                        icon={<CodeBracketIcon className="w-5 h-5 text-slate-500"/>}
                        title="行業專用範本"
                        description="需要法醫、fMRI、基因體學、疫情空間分布等特定行業的R語言提示詞。"
                    />
                     <PopularDirectionCard 
                        icon={<ChatBubbleLeftRightIcon className="w-5 h-5 text-slate-500"/>}
                        title="多情境應用"
                        description="臨床監測、金融詐欺偵測或儀器故障預警等不同場景的R語言提示詞。"
                    />
                     <PopularDirectionCard 
                        icon={<BeakerIcon className="w-5 h-5 text-slate-500"/>}
                        title="特殊輸出類型"
                        description="如Markdown、互動式儀表板等特殊輸出類型。"
                    />
                     <PopularDirectionCard 
                        icon={<ChartBarIcon className="w-5 h-5 text-slate-500"/>}
                        title="進階分析功能"
                        description="貿易分析、槍擊殘跡元素組成、彈道比對等進階功能。"
                    />
                </div>
            </div>
        </div>
    );
};

export default PromptWishlist;
