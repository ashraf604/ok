const { formatNumber } = require("./database_helpers.js");

function formatPrivateBuy(details) {
    const { asset, price, amountChange, tradeValue, oldTotalValue, newAssetWeight, newUsdtValue, newCashPercent } = details;
    const tradeSizePercent = oldTotalValue > 0 ? (tradeValue / oldTotalValue) * 100 : 0;

    let msg = `*مراقبة الأصول 🔬:*\n**عملية استحواذ جديدة 🟢**\n━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `🔸 **الأصل المستهدف:** \`${asset}/USDT\`\n`;
    msg += `🔸 **نوع العملية:** تعزيز مركز / بناء مركز جديد\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n*تحليل الصفقة:*\n`;
    msg += ` ▪️ **سعر التنفيذ:** \`$${formatNumber(price, 4)}\`\n`;
    msg += ` ▪️ **الكمية المضافة:** \`${formatNumber(Math.abs(amountChange), 6)}\`\n`;
    msg += ` ▪️ **التكلفة الإجمالية للصفقة:** \`$${formatNumber(tradeValue)}\`\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n*التأثير على هيكل المحفظة:*\n`;
    msg += ` ▪️ **حجم الصفقة من إجمالي المحفظة:** \`${formatNumber(tradeSizePercent)}%\`\n`;
    msg += ` ▪️ **الوزن الجديد للأصل:** \`${formatNumber(newAssetWeight)}%\`\n`;
    msg += ` ▪️ **السيولة المتبقية (USDT):** \`$${formatNumber(newUsdtValue)}\`\n`;
    msg += ` ▪️ **مؤشر السيولة الحالي:** \`${formatNumber(newCashPercent)}%\`\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n*بتاريخ:* ${new Date().toLocaleString("ar-EG", { timeZone: "Africa/Cairo" })}`;
    return msg;
}

function formatPrivateSell(details) {
    const { asset, price, amountChange, tradeValue, oldTotalValue, newAssetWeight, newUsdtValue, newCashPercent } = details;
    const tradeSizePercent = oldTotalValue > 0 ? (tradeValue / oldTotalValue) * 100 : 0;
    
    let msg = `*مراقبة الأصول 🔬:*\n**مناورة تكتيكية 🟠**\n━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `🔸 **الأصل المستهدف:** \`${asset}/USDT\`\n`;
    msg += `🔸 **نوع العملية:** تخفيف المركز / جني أرباح جزئي\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n*تحليل الصفقة:*\n`;
    msg += ` ▪️ **سعر التنفيذ:** \`$${formatNumber(price, 4)}\`\n`;
    msg += ` ▪️ **الكمية المخففة:** \`${formatNumber(Math.abs(amountChange), 6)}\`\n`;
    msg += ` ▪️ **العائد الإجمالي للصفقة:** \`$${formatNumber(tradeValue)}\`\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n*التأثير على هيكل المحفظة:*\n`;
    msg += ` ▪️ **حجم الصفقة من إجمالي المحفظة:** \`${formatNumber(tradeSizePercent)}%\`\n`;
    msg += ` ▪️ **الوزن الجديد للأصل:** \`${formatNumber(newAssetWeight)}%\`\n`;
    msg += ` ▪️ **السيولة الجديدة (USDT):** \`$${formatNumber(newUsdtValue)}\`\n`;
    msg += ` ▪️ **مؤشر السيولة الحالي:** \`${formatNumber(newCashPercent)}%\`\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n*بتاريخ:* ${new Date().toLocaleString("ar-EG", { timeZone: "Africa/Cairo" })}`;
    return msg;
}

function formatPrivateCloseReport(details) {
    const { asset, avgBuyPrice, avgSellPrice, pnl, pnlPercent, durationDays, highestPrice, lowestPrice } = details;
    const pnlSign = pnl >= 0 ? '+' : '';
    const emoji = pnl >= 0 ? '🟢' : '🔴';

    let msg = `*ملف المهمة الختامي ${emoji}*\n**${asset}/USDT**\n━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `🔸 **متوسط سعر الشراء:** \`$${formatNumber(avgBuyPrice, 4)}\`\n`;
    msg += `🔸 **متوسط سعر البيع:** \`$${formatNumber(avgSellPrice, 4)}\`\n`;
    msg += `🔸 **الربح/الخسارة المحققة:** \`${pnlSign}$${formatNumber(pnl)}\` (${pnlSign}${formatNumber(pnlPercent)}%)\n`;
    msg += `🔸 **مدة الصفقة:** \`${formatNumber(durationDays, 1)}\` يوم\n`;
    msg += `🔸 **أعلى سعر خلال الصفقة:** \`$${formatNumber(highestPrice, 4)}\`\n`;
    msg += `🔸 **أدنى سعر خلال الصفقة:** \`$${formatNumber(lowestPrice, 4)}\`\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n*بتاريخ:* ${new Date().toLocaleString("ar-EG", { timeZone: "Africa/Cairo" })}`;
    return msg;
}

function formatPortfolioMessage(portfolio, prices) {
    let msg = `*📊 ملخص المحفظة (${new Date().toLocaleDateString("ar-EG", { timeZone: "Africa/Cairo" })}):*\n\n`;
    if (portfolio.error) {
        msg += `⚠️ ${portfolio.error}\n`;
        return msg;
    }

    msg += `*القيمة الإجمالية:* \`$${formatNumber(portfolio.total)}\`\n`;
    msg += `*السيولة (USDT):* \`$${formatNumber(portfolio.usdtValue)}\`\n\n`;

    if (portfolio.assets.length > 0) {
        msg += `*الأصول:*\n`;
        portfolio.assets.forEach(asset => {
            const changeEmoji = asset.change24h >= 0 ? (asset.change24h > 0 ? '📈' : '') : '📉';
            const changeText = asset.change24h !== 0 ? ` (${formatNumber(asset.change24h * 100, 2)}%)` : '';
            msg += `• ${asset.asset}: \`$${formatNumber(asset.value)}\` (${formatNumber(asset.amount, 4)} ${asset.asset}) ${changeEmoji}${changeText}\n`;
        });
    } else {
        msg += `لا توجد أصول في المحفظة حاليًا.\n`;
    }
    return msg;
}

function formatDailySummary(summary) {
    let msg = `*📈 ملخص الأداء اليومي (${new Date().toLocaleDateString("ar-EG", { timeZone: "Africa/Cairo" })}):*\n\n`;
    if (summary.error) {
        msg += `⚠️ ${summary.error}\n`;
        return msg;
    }

    const pnlEmoji = summary.pnl >= 0 ? '🟢' : '🔴';
    const pnlSign = summary.pnl >= 0 ? '+' : '';

    msg += `*القيمة الافتتاحية:* \`$${formatNumber(summary.startValue)}\`\n`;
    msg += `*القيمة الختامية:* \`$${formatNumber(summary.endValue)}\`\n`;
    msg += `*الربح/الخسارة اليومية:* ${pnlEmoji} \`${pnlSign}$${formatNumber(summary.pnl)}\` (${pnlSign}${formatNumber(summary.pnlPercent)}%)\n`;
    msg += `*أعلى قيمة:* \`$${formatNumber(summary.maxValue)}\`\n`;
    msg += `*أدنى قيمة:* \`$${formatNumber(summary.minValue)}\`\n\n`;

    if (summary.chartUrl) {
        msg += `[عرض الرسم البياني](${summary.chartUrl})\n`;
    }

    return msg;
}

function formatTechnicalAnalysisMessage(instId, analysis) {
    let msg = `*تحليل فني لـ ${instId.toUpperCase()}*\n━━━━━━━━━━━━━━━━━━━━\n`;
    if (analysis.error) {
        msg += `⚠️ ${analysis.error}\n`;
        return msg;
    }

    msg += `🔸 *مؤشر القوة النسبية (RSI):* \`${formatNumber(analysis.rsi, 2)}\`\n`;
    msg += `🔸 *المتوسط المتحرك البسيط (SMA20):* \`$${formatNumber(analysis.sma20, 4)}\`\n`;
    msg += `🔸 *المتوسط المتحرك البسيط (SMA50):* \`$${formatNumber(analysis.sma50, 4)}\`\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    return msg;
}

function formatPriceAlertMessage(alert) {
    return `🔔 *تنبيه سعر:*\nالأصل: *${alert.instId}*\nالسعر الحالي: \`$${formatNumber(alert.currentPrice, 4)}\`\nالسعر المستهدف: \`$${formatNumber(alert.targetPrice, 4)}\`\nالاتجاه: *${alert.direction === 'above' ? 'أعلى من' : 'أقل من'}*\n`;
}

function formatVirtualTradeSummary(trade) {
    let msg = `*صفقة افتراضية جديدة 📊*\n`;
    msg += `الأصل: *${trade.asset}*\n`;
    msg += `الكمية: \`${formatNumber(trade.amount, 4)}\`\n`;
    msg += `سعر الدخول: \`$${formatNumber(trade.entryPrice, 4)}\`\n`;
    msg += `تاريخ الدخول: ${new Date(trade.enteredAt).toLocaleString("ar-EG", { timeZone: "Africa/Cairo" })}\n`;
    msg += `الحالة: *${trade.status}*\n`;
    if (trade.status === 'closed') {
        msg += `سعر الإغلاق: \`$${formatNumber(trade.closePrice, 4)}\`\n`;
        msg += `تاريخ الإغلاق: ${new Date(trade.closedAt).toLocaleString("ar-EG", { timeZone: "Africa/Cairo" })}\n`;
        const pnl = (trade.closePrice - trade.entryPrice) * trade.amount;
        const pnlPercent = (pnl / (trade.entryPrice * trade.amount)) * 100;
        const pnlEmoji = pnl >= 0 ? '🟢' : '🔴';
        const pnlSign = pnl >= 0 ? '+' : '';
        msg += `الربح/الخسارة: ${pnlEmoji} \`${pnlSign}$${formatNumber(pnl)}\` (${pnlSign}${formatNumber(pnlPercent)}%)\n`;
    }
    return msg;
}

module.exports = {
    formatPrivateBuy,
    formatPrivateSell,
    formatPrivateCloseReport,
    formatPortfolioMessage,
    formatDailySummary,
    formatTechnicalAnalysisMessage,
    formatPriceAlertMessage,
    formatVirtualTradeSummary
};
