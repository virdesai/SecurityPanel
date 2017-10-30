/*
 * @Author: Vir Desai 
 * @Date: 2017-10-13 22:36:49 
 * @Last Modified by: Vir Desai
 * @Last Modified time: 2017-10-14 17:38:11
 */

/**
 * App Theme - Colors
 */

const app = {
    background:         '#000000',
    cardBackground:     '#585858',
    listItemBackground: '#585858',
    transparent:        'rgba(0,0,0,0)',
    red:                '#FF0000',
    green:              '#6DAC41',
    blue:               '#0000FF',
    grey:               '#585858',
    yellow:             '#fda929',
    lightGrey:          '#E0E0E0',
    shadowColor:        '#C8C8C8'
};

const brand = {
    brand: {
        primary:   '#223344',
        darkBlue:  '#112233',
        darkGreen: '#528232',
        red:       '#972c2f',
        yellow:    '#e0af12',
        blue:      '#99badd',
        grey:      '#333333',
        light:     '#ebf5f7',
        fogGrey:   '#c8c8c8',
        skyGrey:   '#f0f0f0'
    },
};

const text = {
    textPrimary:      '#e8e8e8',
    textSecondary:    '#99badd',
    headingPrimary:   brand.brand.primary,
    headingSecondary: brand.brand.primary,
};

const borders = {
    border: '#D0D1D5',
};

const tabbar = {
    tabbar: {
        background:   '#ffffff',
        iconDefault:  '#BABDC2',
        iconSelected: brand.brand.primary,
    },
};

export default {
    ...app,
    ...brand,
    ...text,
    ...borders,
    ...tabbar,
};
