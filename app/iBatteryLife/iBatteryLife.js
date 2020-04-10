"use strict";
class IBatteryLife {
    constructor() {
        this.chargeTimes = -1;
        this.designCapacity = -1;
        this.actualCapacity = -1;
        this.size = 150;
        this.textIntro = {
            reduced: 'Reduced',
            remaining: 'Remaining',
            chargeTimes: 'Charge Times'
        };
        this.backgroundColor = 'white';
        this.textColor = 'black';
        this.colors = ['#1B9E77', '#D95F02'];
        this.debug = false;
    }
    setBatteryInfo(chargeTimes, designCapacity, actualCapacity) {
        this.chargeTimes = chargeTimes;
        this.designCapacity = designCapacity;
        this.actualCapacity = actualCapacity;
        return this;
    }
    setTextColor(colorHex) {
        this.textColor = colorHex;
        return this;
    }
    setBackgroundColor(colorHex) {
        this.backgroundColor = colorHex;
        return this;
    }
    setTextIntro(reduced, remaining, chargeTimes) {
        this.textIntro.reduced = reduced;
        this.textIntro.remaining = remaining;
        this.textIntro.chargeTimes = chargeTimes;
        return this;
    }
    setColors(colors) {
        if (colors.length < 2)
            throw "Colors need set more then 2";
        this.colors = colors;
        return this;
    }
    setDebug(on) {
        this.debug = on;
        return this;
    }
    showChart(selector, callback) {
        if (this.chargeTimes < 0) {
            throw "Need set chargeTimes > 0";
        }
        if (this.designCapacity < 0) {
            throw "Need set designCapacity > 0";
        }
        if (this.actualCapacity < 0) {
            throw "Need set actualCapacity > 0";
        }
        if (this.designCapacity < this.actualCapacity) {
            throw 'Check your set your [designCapacity:' + this.designCapacity + '] is more than the [actualCapacity:' + this.actualCapacity + ']';
        }
        let dataset = [this.actualCapacity, this.designCapacity - this.actualCapacity];
        let intro = [this.textIntro.remaining, this.textIntro.reduced, this.textIntro.chargeTimes];
        let svg = d3.select(selector)
            .append('svg')
            .attr('id', 'iBatteryLifeSVG')
            .attr('width', this.size)
            .attr('height', this.size + 50)
            .attr('viewBox', '0 0 ' + this.size + ' ' + (this.size + 50))
            .style('background', this.backgroundColor);
        svg.append('style')
            .attr('type', 'text/css')
            .text("@import url('https://cdn.jsdelivr.net/npm/taipei-sans-tc/dist/Bold/TaipeiSansTCBeta-Bold.css');\n" +
            "svg,text{font-family: 'TaipeiSansTCBeta-Bold',sans-serif}");
        let chart = svg.append('g')
            .attr('transform', 'translate(' + this.size / 2 + ',' + (this.size / 2 + 50) + ')');
        const arc = d3.arc()
            .innerRadius(this.size / 2 - (this.size / 10))
            .outerRadius(this.size / 2 - 2);
        const pie = d3.pie();
        let colors = this.colors;
        chart.selectAll('path')
            .data(pie(dataset))
            .enter()
            .append('g')
            .append('path')
            .attr('d', (arc))
            .style('fill', function (d) {
            return colors[d.index];
        });
        let formatNumber = d3.format('.2f');
        let lifeCalc = (this.actualCapacity / this.designCapacity) * 100;
        let data = [formatNumber(lifeCalc) + '%', formatNumber(100 - lifeCalc) + '%', '' + this.chargeTimes];
        // life text
        let texts = chart.append('g');
        let newIntro = [];
        intro.forEach(function (str, i) {
            newIntro.push(str);
            newIntro.push(data[i]);
        });
        const textColor = this.textColor;
        newIntro.forEach(function (str, i) {
            let t = texts.append('text')
                .attr('fill', textColor)
                .text(str)
                .style('font-size', '13px')
                .style('font-weight', 'bold');
            let w = t.node().getBoundingClientRect().width;
            let h = t.node().getBoundingClientRect().height;
            t.attr('transform', 'translate(-' + w / 2 + ',' + (i * h) + ')');
        });
        let textsH = texts.node().getBoundingClientRect().height;
        texts.attr('transform', 'translate(' + 0 + ',' + (-1 * textsH / 2 + 20) + ')');
        let size = this.size;
        svg.selectAll('circle')
            .data(pie(dataset))
            .enter()
            .append('g')
            .attr('class', 'tip')
            .attr('transform', function (d, index) {
            return 'translate(' + 15 + ',' + (10 + index * 25) + ')';
        })
            .append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', 5)
            .style('fill', function (d) {
            return colors[d.index];
        });
        svg.selectAll('.tip')
            .append('text')
            .style('font-size', '11px')
            .attr('x', 20)
            .attr('y', 5)
            .attr('fill', this.textColor)
            .text(function (d, i) {
            return intro[i];
        });
        // return base64
        let baseCallback = function (imgURL) {
            if (callback)
                callback(imgURL);
        };
        let svg_ele = document.getElementById('iBatteryLifeSVG');
        if (svg_ele) {
            let svg_data = new XMLSerializer().serializeToString(svg_ele);
            let canvas = document.createElement('canvas');
            // 150 * 200
            canvas.width = 600;
            canvas.height = 800;
            let ctx = canvas.getContext('2d');
            let img = document.createElement('img');
            img.setAttribute('src', 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg_data))));
            img.onload = function () {
                ctx.drawImage(img, 0, 0, 600, 800);
                let imgURL = canvas.toDataURL('image/png');
                baseCallback(imgURL);
            };
        }
        else {
            baseCallback(undefined);
        }
        if (!this.debug)
            d3.select(selector).selectAll('*').remove();
    }
}
//# sourceMappingURL=iBatteryLife.js.map