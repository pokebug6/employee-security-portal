import React, {useState, useMemo} from 'react';
import {
    Shield,
    Star,
    Lightbulb,
    Megaphone,
    Gamepad2,
    Award,
    Tv,
    Laptop,
    Smartphone,
    HelpCircle,
    CheckCircle,
    XCircle,
    Lock,
    ArrowRight
} from 'lucide-react';

// --- 模拟数据 (与之前版本相同) ---

// 推荐工具数据
const toolsData = [
    {
        id: 1,
        name: '1Password',
        category: '密码管理',
        description: '一款强大且用户友好的密码管理器，可安全地存储您的所有密码和敏感信息。',
        rating: 5,
        platforms: ['mac', 'windows', 'ios', 'android'],
        url: '#',
        icon: 'https://placehold.co/64x64/7c3aed/ffffff?text=1P&font=raleway'
    },
    {
        id: 2,
        name: 'NordVPN',
        category: 'VPN',
        description: '通过加密您的互联网连接来保护您的在线隐私，确保数据安全。',
        rating: 4,
        platforms: ['mac', 'windows', 'ios', 'android'],
        url: '#',
        icon: 'https://placehold.co/64x64/10b981/ffffff?text=NV&font=raleway'
    },
    {
        id: 3,
        name: 'Malwarebytes',
        category: '反病毒',
        description: '主动防护，能够检测并清除恶意软件、勒索软件和其他网络威胁。',
        rating: 5,
        platforms: ['mac', 'windows', 'android'],
        url: '#',
        icon: 'https://placehold.co/64x64/3b82f6/ffffff?text=MB&font=raleway'
    },
    {
        id: 4,
        name: 'Authy',
        category: '双因素认证',
        description: '为您的在线账户增加一层额外的安全保护，防止未经授权的访问。',
        rating: 4,
        platforms: ['ios', 'android'],
        url: '#',
        icon: 'https://placehold.co/64x64/ef4444/ffffff?text=AU&font=raleway'
    },
    {
        id: 5,
        name: 'Signal',
        category: '安全通信',
        description: '提供端到端加密的即时通讯应用，保护您的对话隐私。',
        rating: 5,
        platforms: ['mac', 'windows', 'ios', 'android'],
        url: '#',
        icon: 'https://placehold.co/64x64/6366f1/ffffff?text=SG&font=raleway'
    },
];

// 知识库热门文章
const popularArticles = [
    {id: 1, title: '如何识别钓鱼邮件？', category: '邮件安全', views: 1024},
    {id: 2, title: '创建强密码的最佳实践', category: '账户安全', views: 876},
    {id: 3, title: '公共 Wi-Fi 的安全风险', category: '网络安全', views: 750},
];

// 最新动态
const latestNews = [
    {id: 1, text: '公司将于下周举行年度安全意识培训。', date: '3天前'},
    {id: 2, text: '新的 VPN 工具已添加到推荐列表。', date: '5天前'},
];

// 安全公告
const announcements = [
    {
        id: 'A001',
        title: '【重要】关于近期 Log4j 漏洞的安全通告',
        date: '2024-12-15',
        level: '高危',
        content: '我们检测到 Log4j 存在严重安全漏洞，请所有开发人员立即更新相关组件至最新版本。详情请参考内部文档...'
    },
    {
        id: 'A002',
        title: '【提醒】谨防冒充 IT 部门的钓鱼邮件',
        date: '2024-12-10',
        level: '中危',
        content: '近期发现有攻击者冒充 IT 部门发送钓鱼邮件，企图窃取员工凭证。请注意甄别，不要点击可疑链接。'
    },
    {
        id: 'A003',
        title: '【通知】季度安全策略更新说明',
        date: '2024-12-01',
        level: '低',
        content: '本季度安全策略已更新，主要涉及移动设备接入规范，请大家查阅。'
    },
];

// 互动专区 - 问题
const questions = [
    {id: 1, user: '张三', question: '我的个人电脑需要安装公司的杀毒软件吗？', answers: 3, date: '2天前'},
    {id: 2, user: '李四', question: '使用MFA（多因素认证）后，是不是密码就不那么重要了？', answers: 5, date: '4天前'},
    {id: 3, user: '王五', question: '有没有推荐的浏览器安全插件？', answers: 2, date: '一周前'},
]

// 安全自查 - 钓鱼邮件挑战
const phishingChallenge = {
    from: 'support@micorsoft-security.com',
    subject: '紧急：您的账户存在异常活动，请立即验证',
    body: `<p>尊敬的用户：</p><p>我们的系统检测到您的账户有异常登录尝试。为了保护您的账户安全，请立即点击以下链接验证您的身份。</p><p>如果您不在 24 小时内验证，您的账户将被临时冻结。</p><br/><p><a href="#" class="text-blue-600 hover:underline">点击这里验证</a></p><br/><p>此致，</p><p>Microsoft 安全团队</p>`,
    clues: ['发件人邮箱地址 "micorsoft" 拼写错误，模仿 "microsoft"。', '使用紧急和威胁性的语言（“立即验证”、“账户将被临时冻结”）来制造恐慌。', '通用称呼“尊敬的用户”，而不是直呼您的姓名。', '将鼠标悬停在链接上时，实际地址可能指向一个可疑的、非官方的域名。']
};

// 成就徽章
const allAchievements = [
    {id: 'phishing_spotter', name: '火眼金睛', description: '成功完成钓鱼邮件识别挑战。', icon: Shield},
    {id: 'quiz_master', name: '安全知识达人', description: '在安全知识测验中获得满分。', icon: Lightbulb},
    {id: 'first_tool', name: '武装起来', description: '从推荐列表下载并安装了第一个安全工具。', icon: Gamepad2},
    {id: 'sharer', name: '乐于分享', description: '在互动专区回答了第一个问题。', icon: Megaphone},
    {id: 'veteran', name: '安全老兵', description: '已加入安全中心超过一年。', icon: Award},
    {id: 'perfect_attendee', name: '全勤标兵', description: '参加了本年度所有的安全培训。', icon: CheckCircle},
];


// --- 子组件 (优化后) ---

const PlatformIcon = ({platform}) => {
    switch (platform) {
        case 'mac':
            return <Laptop className="h-5 w-5 text-slate-500" title="macOS" />;
        case 'windows':
            return <Tv className="h-5 w-5 text-slate-500" title="Windows" />;
        case 'ios':
            return <Smartphone className="h-5 w-5 text-slate-500" title="iOS" />;
        case 'android':
            return <Smartphone className="h-5 w-5 text-slate-500" title="Android" />;
        default:
            return null;
    }
};

const StarRating = ({rating}) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`} />
        ))}
    </div>
);

// 主页组件 (优化后)
const HomePage = ({setActiveTab}) => (
    <div className="space-y-8 animate-fade-in">
        {/* 顶部警告/提醒区域 */}
        <div
            className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 rounded-2xl shadow-lg text-white relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full"></div>
            <div className="absolute right-20 -bottom-20 w-56 h-56 bg-white/10 rounded-full"></div>
            <div className="relative z-10">
                <div className="flex items-center mb-3">
                    <Megaphone className="h-7 w-7 mr-3" />
                    <h2 className="text-2xl font-bold">重要安全提醒</h2>
                </div>
                <p className="text-lg opacity-90 mb-6">
                    请全体员工更新您的操作系统和浏览器至最新版本，以修复已知的安全漏洞。IT部门不会通过邮件索要您的密码，请警惕任何此类请求。
                </p>
                <button onClick={() => setActiveTab('announcements')}
                        className="bg-white text-indigo-600 font-bold py-2 px-6 rounded-full hover:bg-slate-100 transition-all transform hover:scale-105">
                    查看所有公告
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左侧区域 */}
            <div className="lg:col-span-2 space-y-8">
                {/* 热门知识 */}
                <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
                    <h2 className="text-xl font-semibold text-slate-800 mb-4">热门知识库</h2>
                    <ul className="space-y-3">
                        {popularArticles.map(article => (
                            <li key={article.id}
                                className="flex justify-between items-center p-4 rounded-xl hover:bg-slate-50 transition-colors">
                                <div>
                                    <a href="#"
                                       className="font-medium text-slate-700 hover:text-blue-600">{article.title}</a>
                                    <span
                                        className="ml-3 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">{article.category}</span>
                                </div>
                                <span className="text-slate-500 text-sm">{article.views} 次浏览</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* 右侧边栏 */}
            <div className="space-y-8">
                {/* 快速挑战 */}
                <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 text-center">
                    <Gamepad2 className="h-12 w-12 mx-auto mb-3 text-purple-600" />
                    <h3 className="text-lg font-bold text-slate-800">钓鱼邮件挑战</h3>
                    <p className="text-sm text-slate-500 mb-4">测试您识别网络钓鱼的能力。</p>
                    <button onClick={() => setActiveTab('selfcheck')}
                            className="w-full bg-slate-800 text-white font-semibold py-3 px-4 rounded-lg hover:bg-slate-900 transition-colors transform hover:scale-105">
                        开始挑战
                    </button>
                </div>
                {/* 最新动态 */}
                <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
                    <h2 className="text-xl font-semibold text-slate-800 mb-4">最新动态</h2>
                    <ul className="space-y-4">
                        {latestNews.map(news => (
                            <li key={news.id} className="flex items-start">
                                <div className="flex-shrink-0 h-2 w-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                                <div>
                                    <p className="text-slate-700">{news.text}</p>
                                    <span className="text-xs text-slate-400">{news.date}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </div>
);

// 推荐工具组件 (优化后)
const ToolsPage = () => {
    const [filter, setFilter] = useState('所有');
    const categories = ['所有', '密码管理', 'VPN', '反病毒', '双因素认证', '安全通信'];

    const filteredTools = useMemo(() => {
        if (filter === '所有') return toolsData;
        return toolsData.filter(tool => tool.category === filter);
    }, [filter]);

    return (
        <div className="animate-fade-in">
            <div className="mb-8 bg-white p-4 rounded-2xl shadow-md border border-slate-200">
                <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                        <button key={category} onClick={() => setFilter(category)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                                    filter === category
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}>
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTools.map(tool => (
                    <div key={tool.id}
                         className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 flex flex-col hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                        <div className="flex items-center mb-4">
                            <img src={tool.icon} alt={`${tool.name} icon`} className="h-16 w-16 rounded-xl mr-4" />
                            <div>
                                <h3 className="text-xl font-bold text-slate-800">{tool.name}</h3>
                                <p className="text-sm text-slate-500">{tool.category}</p>
                            </div>
                        </div>
                        <p className="text-slate-600 flex-grow mb-5">{tool.description}</p>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-medium text-slate-700">推荐指数:</span>
                            <StarRating rating={tool.rating} />
                        </div>
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-sm font-medium text-slate-700">支持平台:</span>
                            <div className="flex items-center space-x-2">
                                {tool.platforms.map(p => <PlatformIcon key={p} platform={p} />)}
                            </div>
                        </div>
                        <a href={tool.url} target="_blank" rel="noopener noreferrer"
                           className="w-full text-center bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                            获取工具
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

// 安全公告组件 (优化后)
const AnnouncementsPage = () => {
    const getLevelClasses = (level) => {
        switch (level) {
            case '高危':
                return {
                    border: 'border-red-500',
                    bg: 'bg-red-50',
                    text: 'text-red-800',
                    tag: 'bg-red-100 text-red-800'
                };
            case '中危':
                return {
                    border: 'border-yellow-500',
                    bg: 'bg-yellow-50',
                    text: 'text-yellow-800',
                    tag: 'bg-yellow-100 text-yellow-800'
                };
            case '低':
                return {
                    border: 'border-blue-500',
                    bg: 'bg-blue-50',
                    text: 'text-blue-800',
                    tag: 'bg-blue-100 text-blue-800'
                };
            default:
                return {
                    border: 'border-slate-300',
                    bg: 'bg-slate-50',
                    text: 'text-slate-800',
                    tag: 'bg-slate-200 text-slate-800'
                };
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {announcements.map(announcement => {
                const classes = getLevelClasses(announcement.level);
                return (
                    <div key={announcement.id}
                         className={`bg-white p-6 rounded-2xl shadow-md border-l-4 ${classes.border} ${classes.bg}`}>
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                            <h3 className={`text-xl font-bold ${classes.text}`}>{announcement.title}</h3>
                            <span
                                className={`mt-2 sm:mt-0 px-3 py-1 text-sm font-bold rounded-full ${classes.tag}`}>{announcement.level}</span>
                        </div>
                        <p className="text-sm text-slate-500 mb-4">公告编号: {announcement.id} |
                            发布日期: {announcement.date}</p>
                        <p className="text-slate-700 leading-relaxed">{announcement.content}</p>
                    </div>
                )
            })}
        </div>
    )
};

// 互动专区组件 (优化后)
const InteractiveZone = () => {
    const [activeTab, setActiveTab] = useState('q&a');

    return (
        <div className="animate-fade-in">
            <div className="flex border-b border-slate-200 mb-8">
                <button onClick={() => setActiveTab('q&a')}
                        className={`px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'q&a' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}>
                    问答专区
                </button>
                <button onClick={() => setActiveTab('events')}
                        className={`px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'events' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}>
                    活动计划
                </button>
            </div>

            {activeTab === 'q&a' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {questions.map(q => (
                            <div key={q.id} className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
                                <p className="text-slate-800 font-semibold text-lg mb-3">{q.question}</p>
                                <div className="flex justify-between items-center text-sm text-slate-500">
                                    <span>提问者: {q.user} ({q.date})</span>
                                    <a href="#"
                                       className="flex items-center font-semibold text-blue-600 hover:underline">
                                        查看 {q.answers} 条回答 <ArrowRight className="w-4 h-4 ml-1" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 h-fit">
                        <h3 className="text-lg font-bold text-slate-800 mb-2">有安全疑问？</h3>
                        <p className="text-slate-600 mb-4">在这里提出您的问题，我们的安全专家和热心同事会为您解答。</p>
                        <textarea
                            className="w-full p-3 border border-slate-300 rounded-xl mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            rows="4" placeholder="请在这里输入您的问题..."></textarea>
                        <button
                            className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors">
                            提交问题
                        </button>
                    </div>
                </div>
            )}

            {activeTab === 'events' && (
                <div className="bg-white p-10 rounded-2xl shadow-md border border-slate-200 text-center">
                    <h3 className="text-2xl font-bold text-slate-800">2025年第一季度安全培训</h3>
                    <p className="text-slate-600 mt-2 mb-6">主题：企业数据防泄漏与远程办公安全</p>
                    <p className="text-xl font-semibold text-blue-600 mb-2">时间：2025年3月15日 下午2:00</p>
                    <p className="text-slate-500 mb-8">地点：在线会议 (链接将在会前发送)</p>
                    <button
                        className="bg-green-500 text-white font-bold py-3 px-10 rounded-full hover:bg-green-600 transition-transform transform hover:scale-105">
                        立即报名
                    </button>
                </div>
            )}
        </div>
    )
};

// 安全自查组件 (优化后)
const SelfCheckPage = () => {
    const [challengeState, setChallengeState] = useState('idle'); // idle, phishing, result
    const [phishingResult, setPhishingResult] = useState(null); // 'correct', 'incorrect'

    const handlePhishingChoice = (isPhishing) => {
        setPhishingResult(isPhishing ? 'correct' : 'incorrect');
        setChallengeState('result');
    };

    if (challengeState === 'idle') {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                <div onClick={() => setChallengeState('phishing')}
                     className="group bg-white p-8 rounded-2xl shadow-md border border-slate-200 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center text-blue-600 mb-4">
                        <Shield className="h-10 w-10 mr-4" />
                        <h3 className="text-2xl font-bold">钓鱼邮件识别挑战</h3>
                    </div>
                    <p className="text-slate-600 mb-6">模拟真实的钓鱼邮件场景，考验您的辨别能力。准备好接受挑战了吗？</p>
                    <span
                        className="font-semibold text-blue-600 flex items-center group-hover:underline">开始挑战 <ArrowRight
                        className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" /></span>
                </div>
                <div
                    className="group bg-white p-8 rounded-2xl shadow-md border border-slate-200 opacity-60 cursor-not-allowed">
                    <div className="flex items-center text-slate-400 mb-4">
                        <HelpCircle className="h-10 w-10 mr-4" />
                        <h3 className="text-2xl font-bold">安全知识问答</h3>
                    </div>
                    <p className="text-slate-500">涵盖密码安全、网络安全、社交工程等多个方面。即将推出，敬请期待！</p>
                </div>
            </div>
        )
    }

    if (challengeState === 'phishing') {
        return (
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 animate-fade-in-slow">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">挑战：这是一封钓鱼邮件吗？</h2>
                <p className="text-slate-600 mb-6">请仔细检查下面的邮件内容，然后做出您的判断。</p>
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 text-sm">
                    <div className="flex justify-between border-b border-slate-200 pb-3 mb-3">
                        <div>
                            <p className="font-bold">发件人: <span
                                className="font-normal">{phishingChallenge.from}</span></p>
                            <p className="font-bold">主题: <span
                                className="font-normal">{phishingChallenge.subject}</span></p>
                        </div>
                        <span className="text-xs text-slate-500">今天 09:30</span>
                    </div>
                    <div className="text-slate-700 leading-relaxed"
                         dangerouslySetInnerHTML={{__html: phishingChallenge.body}}></div>
                </div>
                <div className="mt-8 flex justify-center gap-4">
                    <button onClick={() => handlePhishingChoice(true)}
                            className="px-8 py-3 font-semibold rounded-full bg-red-500 text-white hover:bg-red-600 transition-transform transform hover:scale-105">
                        <XCircle className="inline-block mr-2" /> 是钓鱼邮件
                    </button>
                    <button onClick={() => handlePhishingChoice(false)}
                            className="px-8 py-3 font-semibold rounded-full bg-green-500 text-white hover:bg-green-600 transition-transform transform hover:scale-105">
                        <CheckCircle className="inline-block mr-2" /> 是正常邮件
                    </button>
                </div>
            </div>
        )
    }

    if (challengeState === 'result') {
        return (
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center animate-fade-in-slow">
                {phishingResult === 'correct' ? (
                    <>
                        <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-green-600">恭喜！判断正确！</h2>
                        <p className="text-slate-600 mt-2 mb-4">您成功识别了这是一封钓鱼邮件。干得漂亮！</p>
                        <div className="bg-green-50 border border-green-200 p-4 rounded-lg my-6 text-left">
                            <h4 className="font-bold text-green-800 mb-2">您已获得新徽章！</h4>
                            <div className="flex items-center">
                                <Shield className="h-10 w-10 text-green-500 mr-3" />
                                <div>
                                    <p className="font-semibold text-slate-800">火眼金睛</p>
                                    <p className="text-sm text-slate-600">成功完成钓鱼邮件识别挑战。</p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <XCircle className="h-20 w-20 text-red-500 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-red-600">哎呀，判断错误</h2>
                        <p className="text-slate-600 mt-2 mb-6">这实际上是一封精心设计的钓鱼邮件。别担心，这是一个学习的机会！</p>
                    </>
                )}
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg text-left">
                    <h4 className="font-bold text-slate-800 mb-3">这封邮件的可疑之处（线索）：</h4>
                    <ul className="list-disc list-inside space-y-2 text-slate-700">
                        {phishingChallenge.clues.map((clue, index) => <li key={index}>{clue}</li>)}
                    </ul>
                </div>
                <button onClick={() => setChallengeState('idle')}
                        className="mt-8 px-8 py-3 font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                    返回挑战列表
                </button>
            </div>
        )
    }
};

// 成就系统组件 (优化后)
const AchievementsPage = () => {
    // 模拟用户已获得的徽章
    const earnedAchievements = ['phishing_spotter', 'first_tool'];

    return (
        <div className="animate-fade-in">
            <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200 mb-8 text-center">
                <h2 className="text-3xl font-bold text-slate-800">我的成就</h2>
                <p className="text-slate-600 mt-2">您已解锁 {earnedAchievements.length} / {allAchievements.length} 个徽章。继续努力！</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {allAchievements.map(ach => {
                    const isEarned = earnedAchievements.includes(ach.id);
                    const Icon = ach.icon;
                    return (
                        <div key={ach.id}
                             className={`p-6 rounded-2xl text-center transition-all duration-300 ${isEarned ? 'bg-white shadow-lg border-2 border-yellow-400' : 'bg-slate-100 border border-slate-200'}`}>
                            <div
                                className={`relative w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 transition-all ${isEarned ? 'bg-yellow-100 scale-110' : 'bg-slate-200'}`}>
                                <Icon
                                    className={`h-12 w-12 transition-colors ${isEarned ? 'text-yellow-500' : 'text-slate-400'}`} />
                                {!isEarned && (
                                    <div
                                        className="absolute inset-0 bg-slate-500 bg-opacity-50 rounded-full flex items-center justify-center">
                                        <Lock className="h-8 w-8 text-white" />
                                    </div>
                                )}
                            </div>
                            <h4 className={`font-bold text-lg ${isEarned ? 'text-slate-800' : 'text-slate-500'}`}>{ach.name}</h4>
                            <p className={`text-sm mt-1 ${isEarned ? 'text-slate-600' : 'text-slate-400'}`}>{ach.description}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

// --- 主应用组件 (优化后) ---
export default function App() {
    const [activeTab, setActiveTab] = useState('home');

    const navItems = [
        {id: 'home', label: '首页', icon: Shield},
        {id: 'tools', label: '推荐工具', icon: Star},
        {id: 'announcements', label: '安全公告', icon: Megaphone},
        {id: 'interactive', label: '互动专区', icon: HelpCircle},
        {id: 'selfcheck', label: '安全自查', icon: Gamepad2},
        {id: 'achievements', label: '成就系统', icon: Award},
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return <HomePage setActiveTab={setActiveTab} />;
            case 'tools':
                return <ToolsPage />;
            case 'announcements':
                return <AnnouncementsPage />;
            case 'interactive':
                return <InteractiveZone />;
            case 'selfcheck':
                return <SelfCheckPage />;
            case 'achievements':
                return <AchievementsPage />;
            default:
                return <HomePage setActiveTab={setActiveTab} />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* 头部和标签页导航 */}
                <header className="py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <div className="flex items-center gap-3 mb-4 sm:mb-0">
                            <div className="bg-blue-600 p-2 rounded-lg shadow-md">
                                <Shield className="h-8 w-8 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-slate-800">企业安全中心</h1>
                        </div>
                    </div>
                    <nav className="mt-6">
                        <div className="block">
                            <div className="border-b border-slate-200">
                                <div className="-mb-px flex space-x-2 sm:space-x-4 overflow-x-auto">
                                    {navItems.map(item => {
                                        const Icon = item.icon;
                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() => setActiveTab(item.id)}
                                                className={`whitespace-nowrap flex items-center gap-2 px-3 py-3 font-semibold text-sm sm:text-base border-b-2 transition-colors ${
                                                    activeTab === item.id
                                                        ? 'border-blue-500 text-blue-600'
                                                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                                }`}
                                            >
                                                <Icon className="h-5 w-5" />
                                                {item.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>

                {/* 主内容区 */}
                <main className="py-8">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}
