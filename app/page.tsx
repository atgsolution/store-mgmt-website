"use client";

import { useState } from "react";
import Image from "next/image";

type Language = "en" | "vi";

const copy = {
  en: {
    nav: ["Features", "Screens", "Deploy", "Limits"],
    navLabel: "Primary navigation",
    eyebrow: "Open source · Self-hosted · Apache 2.0",
    title: "A practical POS for one small shop.",
    lead: "Run sales, tables, orders, shifts, reports, and 80 mm receipts from your own server — with shared PostgreSQL data across computers and tablets.",
    github: "View on GitHub", install: "Quick start", video: "Watch product video",
    workflowKicker: "01 — WORKFLOW", productKicker: "02 — PRODUCT", scopeKicker: "04 — SCOPE", transparencyKicker: "TRANSPARENCY",
    terminalLabel: "Installation commands", heroImageAlt: "Store MGMT application preview",
    builtFor: "Built for daily store operations",
    builtForText: "Store MGMT keeps the workflow focused: staff can sell and print, while admins control menus, accounts, reports, and audit history.",
    features: [
      ["Sales and orders", "Touch-friendly POS, tables, dine-in or takeaway, deposits, discounts, notes, and payment-method tracking."],
      ["Menu management", "Manage products, categories, tags, prices, and availability without editing configuration files."],
      ["Admin and Staff", "Fixed Admin/Staff roles, session controls, read-only paid orders, password recovery, and audit logs."],
      ["Revenue reports", "Daily, monthly, and yearly revenue, payment mix, top products, and opening or closing cash."],
      ["80 mm receipts", "Use the browser print dialog or direct WebUSB ESC/POS with supported thermal printers."],
      ["Vietnamese and English", "Switch the application and receipt language while keeping UTF-8 data in PostgreSQL."],
    ],
    screensTitle: "See the actual application", screensText: "These are real screens from the Community Edition, not design mockups.",
    screens: [
      ["Sales overview", "Tables, items, order totals, discounts, deposits, and checkout in one workspace."],
      ["Menu and prices", "Maintain products, tags, availability, and prices from the Admin interface."],
      ["80 mm receipt", "Preview and reprint receipts, then use browser print or WebUSB ESC/POS."],
      ["Revenue analytics", "Review revenue trends, payment mix, top products, and shift cash."],
    ],
    deployEyebrow: "Docker Compose + PostgreSQL", deployTitle: "Run it on infrastructure you control.",
    deployText: "A Linux host, Docker, Git, and OpenSSL are enough to start. The setup script creates account passwords and unique database secrets — there are no public default passwords.",
    steps: ["Clone the public repository", "Run the guided password setup", "Build and start with Docker Compose"],
    copyLabel: "Copy", copiedLabel: "Copied",
    limitsTitle: "Current scope, stated clearly", limitsText: "The Community Edition is intentionally scoped to one store per deployment. Review these limits before using it in production.",
    limits: ["No multi-store or multi-tenant operation", "No card-terminal integration or payment processing", "No fiscalization, e-invoicing, or accounting integration", "No recipe/BOM inventory deduction", "No kitchen display system (KDS)"],
    transparencyTitle: "Maintainer-built, with AI assistance disclosed",
    transparencyText: "Store MGMT is built and maintained by the project maintainer with significant assistance from OpenAI Codex. The maintainer remains responsible for architecture, code review, testing, security decisions, and releases.",
    feedbackTitle: "Test it in a real workflow", feedbackText: "Feedback about printer compatibility, multiple devices, backup and restore, and missing store workflows is more useful than generic feature requests.",
    discussions: "Open a discussion", issues: "Report a reproducible issue", footer: "Store MGMT Community Edition · Apache License 2.0",
  },
  vi: {
    nav: ["Tính năng", "Màn hình", "Triển khai", "Giới hạn"],
    navLabel: "Điều hướng chính",
    eyebrow: "Mã nguồn mở · Self-hosted · Apache 2.0", title: "POS vừa đủ cho một cửa hàng nhỏ.",
    lead: "Quản lý bán hàng, bàn, đơn hàng, ca, báo cáo và bill 80 mm trên server riêng — dùng chung dữ liệu PostgreSQL giữa máy tính và máy tính bảng.",
    github: "Xem trên GitHub", install: "Cài đặt nhanh", video: "Xem video sản phẩm",
    workflowKicker: "01 — QUY TRÌNH", productKicker: "02 — SẢN PHẨM", scopeKicker: "04 — PHẠM VI", transparencyKicker: "MINH BẠCH",
    terminalLabel: "Lệnh cài đặt", heroImageAlt: "Ảnh xem trước ứng dụng Store MGMT",
    builtFor: "Tập trung cho vận hành hằng ngày", builtForText: "Store MGMT giữ quy trình gọn: nhân viên bán hàng và in bill; admin quản lý menu, tài khoản, báo cáo và audit log.",
    features: [
      ["Bán hàng và đơn hàng", "POS tối ưu cho thao tác chạm: quản lý bàn, dùng tại chỗ hoặc mang đi, tiền cọc, giảm giá, ghi chú và phương thức thanh toán."],
      ["Quản lý menu", "Thêm và quản lý món, loại món, tag, giá bán và trạng thái đang bán ngay trong giao diện Admin — không cần sửa file cấu hình."],
      ["Admin và Staff", "Hai vai trò cố định, kiểm soát phiên đăng nhập, khóa đơn đã thanh toán, đổi mật khẩu và audit log."],
      ["Báo cáo doanh thu", "Theo dõi doanh thu theo ngày, tháng và năm; phương thức thanh toán; món bán chạy; tiền mặt đầu ca và tổng tiền cuối ca."],
      ["Bill nhiệt 80 mm", "In qua hộp thoại in của trình duyệt hoặc gửi lệnh WebUSB ESC/POS trực tiếp tới máy in nhiệt tương thích."],
      ["Tiếng Việt và English", "Chuyển ngôn ngữ giao diện và bill; dữ liệu tiếng Việt có dấu được lưu bằng UTF-8 trong PostgreSQL."],
    ],
    screensTitle: "Xem ứng dụng thực tế", screensText: "Ảnh chụp trực tiếp từ Community Edition, không phải mockup.",
    screens: [
      ["Màn hình bán hàng", "Bàn, món, tổng đơn, giảm giá, tiền cọc và thanh toán trong cùng một màn hình."],
      ["Menu và giá", "Quản lý món, tag, trạng thái bán và giá từ giao diện Admin."],
      ["Bill 80 mm", "Xem trước và in lại bill bằng browser print hoặc WebUSB ESC/POS."],
      ["Phân tích doanh thu", "Theo dõi xu hướng doanh thu, cơ cấu thanh toán, món bán chạy và tiền mặt theo ca."],
    ],
    deployEyebrow: "Docker Compose + PostgreSQL", deployTitle: "Chạy trên hạ tầng do bạn quản lý.",
    deployText: "Chỉ cần một máy Linux, Docker, Git và OpenSSL. Setup script sẽ tạo mật khẩu tài khoản và database secret riêng — không đặt sẵn mật khẩu mặc định công khai.",
    steps: ["Clone repo", "Chạy setup script để tạo mật khẩu", "Build và khởi động bằng Docker Compose"],
    copyLabel: "Sao chép", copiedLabel: "Đã chép",
    limitsTitle: "Phạm vi hiện tại", limitsText: "Community Edition hiện hỗ trợ một cửa hàng cho mỗi deployment. Hãy xem các giới hạn này trước khi dùng trong môi trường thực tế.",
    limits: ["Chưa hỗ trợ nhiều cửa hàng hoặc multi-tenant", "Chưa có card terminal hoặc payment processing", "Chưa có fiscalization, e-invoice hoặc accounting integration", "Chưa trừ tồn kho theo recipe/BOM", "Chưa có kitchen display system (KDS)"],
    transparencyTitle: "Dự án do maintainer phát triển, có hỗ trợ từ AI",
    transparencyText: "Store MGMT do maintainer của dự án trực tiếp xây dựng và duy trì, với sự hỗ trợ đáng kể từ OpenAI Codex. Maintainer vẫn chịu trách nhiệm về kiến trúc, review code, kiểm thử, quyết định bảo mật và các bản phát hành.",
    feedbackTitle: "Hãy thử trong quy trình thực tế", feedbackText: "Feedback về khả năng tương thích máy in, sử dụng trên nhiều thiết bị, backup/restore và những quy trình cửa hàng còn thiếu sẽ hữu ích hơn các yêu cầu tính năng chung chung.",
    discussions: "Mở thảo luận", issues: "Báo lỗi có thể tái hiện", footer: "Store MGMT Community Edition · Apache License 2.0",
  },
} as const;

const repo = "https://github.com/atgsolution/store-mgmt-community";
const command = `git clone ${repo}.git\ncd store-mgmt-community\nbash scripts/setup-linux.sh\ndocker compose up -d --build`;

const featureIcons = [
  <><path d="m4 16 5-5 4 4 7-8" /><path d="M15 7h5v5" /></>,
  <><path d="M5 6h14M5 12h14M5 18h9" /></>,
  <><path d="M12 3 19 6v5c0 4.5-2.9 8.1-7 10-4.1-1.9-7-5.5-7-10V6l7-3Z" /><path d="m9 12 2 2 4-4" /></>,
  <><path d="M5 19V11M12 19V5M19 19v-8" /></>,
  <><path d="M5 8h14v11H5zM8 8V5h8v3M8 15h8" /></>,
  <><circle cx="12" cy="12" r="8" /><path d="M4 12h16M12 4c2 2.2 3 4.9 3 8s-1 5.8-3 8M12 4c-2 2.2-3 4.9-3 8s1 5.8 3 8" /></>,
] as const;

function Mark({ index }: { index: number }) {
  return <span className="feature-mark" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false">{featureIcons[index]}</svg></span>;
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [copied, setCopied] = useState(false);
  const t = copy[language];

  const changeLanguage = (next: Language) => { setLanguage(next); document.documentElement.lang = next; };
  const copyCommand = async () => { await navigator.clipboard.writeText(command); setCopied(true); window.setTimeout(() => setCopied(false), 1800); };
  const screenImages = ["sales-overview.png", "menu-and-prices.png", "receipt-preview.png", "revenue-analytics.png"];
  const screenSizes = [[1229, 815], [1231, 460], [332, 439], [1234, 718]];

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Store MGMT home"><span className="brand-mark">SM</span><span><strong>STORE MGMT</strong><small>COMMUNITY EDITION</small></span></a>
        <nav aria-label={t.navLabel}>{t.nav.map((item, index) => <a key={item} href={["#features", "#screens", "#deploy", "#limits"][index]}>{item}</a>)}</nav>
        <div className="header-actions"><div className="language-switch" aria-label="Language"><button type="button" className={language === "en" ? "active" : ""} aria-pressed={language === "en"} onClick={() => changeLanguage("en")}>EN</button><button type="button" className={language === "vi" ? "active" : ""} aria-pressed={language === "vi"} onClick={() => changeLanguage("vi")}>VI</button></div><a className="github-link" href={repo} target="_blank" rel="noopener noreferrer">GitHub <span>↗</span></a></div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy"><p className="eyebrow"><span />{t.eyebrow}</p><h1>{t.title}</h1><p className="hero-lead">{t.lead}</p><div className="cta-row"><a className="button primary" href={repo} target="_blank" rel="noopener noreferrer">{t.github}<span>↗</span></a><a className="button secondary" href="#deploy">{t.install}<span>↓</span></a></div><a className="video-link" href={`${repo}/releases/download/v1.0.1/store-mgmt-guide.mp4`} target="_blank" rel="noopener noreferrer"><span>▶</span>{t.video}</a></div>
        <div className="hero-media"><div className="media-window"><div className="window-bar"><span /><span /><span /><em>store-mgmt.local</em></div><Image src="/media/product-preview.gif" alt={t.heroImageAlt} width={720} height={405} sizes="(max-width: 1050px) 100vw, 55vw" unoptimized priority /></div><div className="media-note"><strong>80 mm</strong><span>Browser print<br />WebUSB ESC/POS</span></div></div>
      </section>

      <section className="section intro" id="features"><div className="section-heading"><p className="kicker">{t.workflowKicker}</p><h2>{t.builtFor}</h2><p>{t.builtForText}</p></div><div className="feature-grid">{t.features.map(([title, description], index) => <article className="feature-card" key={title}><Mark index={index} /><h3>{title}</h3><p>{description}</p></article>)}</div></section>

      <section className="section screens-section" id="screens"><div className="section-heading horizontal"><div><p className="kicker">{t.productKicker}</p><h2>{t.screensTitle}</h2></div><p>{t.screensText}</p></div><div className="screens-grid">{t.screens.map(([title, description], index) => <figure className={`screen-card screen-${index + 1}`} key={title}><div className="screen-image"><Image src={`/screenshots/${screenImages[index]}`} alt={title} width={screenSizes[index][0]} height={screenSizes[index][1]} sizes="(max-width: 720px) 100vw, 50vw" unoptimized /></div><figcaption><span>0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div></figcaption></figure>)}</div></section>

      <section className="deploy-section" id="deploy"><div className="deploy-copy"><p className="kicker light">03 — {t.deployEyebrow}</p><h2>{t.deployTitle}</h2><p>{t.deployText}</p><ol>{t.steps.map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}</ol></div><div className="terminal" aria-label={t.terminalLabel}><div className="terminal-top"><span>quick-start.sh</span><button type="button" onClick={copyCommand}>{copied ? t.copiedLabel : t.copyLabel}</button></div><pre><code><span className="prompt">$</span> git clone {repo}.git{"\n"}<span className="prompt">$</span> cd store-mgmt-community{"\n"}<span className="prompt">$</span> bash scripts/setup-linux.sh{"\n"}<span className="prompt">$</span> docker compose up -d --build</code></pre><div className="terminal-status"><span className="status-dot" /> http://localhost:6086</div></div></section>

      <section className="section limits-section" id="limits"><div className="section-heading"><p className="kicker">{t.scopeKicker}</p><h2>{t.limitsTitle}</h2><p>{t.limitsText}</p></div><ul className="limits-list">{t.limits.map((limit) => <li key={limit}><span>—</span>{limit}</li>)}</ul></section>

      <section className="section transparency"><div className="transparency-card"><p className="kicker">{t.transparencyKicker}</p><h2>{t.transparencyTitle}</h2><p>{t.transparencyText}</p></div><div className="feedback-card"><h2>{t.feedbackTitle}</h2><p>{t.feedbackText}</p><div><a href={`${repo}/discussions`} target="_blank" rel="noopener noreferrer">{t.discussions} ↗</a><a href={`${repo}/issues`} target="_blank" rel="noopener noreferrer">{t.issues} ↗</a></div></div></section>

      <footer><a className="brand compact" href="#top"><span className="brand-mark">SM</span><span><strong>STORE MGMT</strong></span></a><p>{t.footer}</p><a href={repo} target="_blank" rel="noopener noreferrer">GitHub ↗</a></footer>
    </main>
  );
}
