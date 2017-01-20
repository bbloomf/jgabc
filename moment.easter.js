(function(moment){
// I found this algorithm on
// http://www.merlyn.demon.co.uk/estralgs.txt
//
// Given by
// Al Petrofsky, San Mateo County, California, U.S.A., E-mail 2009-05-22
moment.easter = function Easter20ops(year) {
    'use strict';
    /*jslint bitwise: true, vars: true */
    var a = (year / 100 | 0) * 1483 - (year / 400 | 0) * 2225 + 2613;
    var b = ((year % 19 * 3510 + (a / 25 | 0) * 319) / 330 | 0) % 29;
    // return 56 - b - ((year * 5 / 4 | 0) + a - b) % 7;

    var c = 148 - b - ((year * 5 / 4 | 0) + a - b) % 7;

    return moment({year: year, month: (c / 31 | 0) - 1, day: c % 31 + 1});

    // To get Month & Day in 23 total arithmetic operations, use:
    //   c = 148 - b - ((year * 5 / 4 | 0) + a - b) % 7;
    //   Month = (c / 31 | 0);
    //   Day = c % 31 + 1;

    // The coefficients in the formula for A were chosen so that both of
    // these equations would hold:
    //
    //   a / 25 % 30 == ((y / 100 * 17 + 11) / 25 - y / 400 + 16) % 30
    //   a % 7 == (y / 400 + y / 100 * 6 + 2) % 7

    // As a result, the formulae for B and the return value are
    // equivalent to:
    //
    // b = ( 29 * 11 * (15 + y % 19 * 19
    //                     + y / 100 - y / 400
    //                     - (   (y / 100 + 25 - 14) * 8 / 25
    //                         - (          25 - 14) * 8 / 25)
    //                     + 1)
    //       - 1 - y % 19)
    //     % (30 * 29 * 11) / (30 * 11)
    // return 28 + b - (2 + b + y + y / 4 - y / 100 + y / 400) % 7

    // B represents the date of the Paschal Full Moon, ranging from 0
    // for March 21st to 28 for April 18th.
    //
    // Here are some pertinent facts about the constants in these
    // formulae:
    //
    // 400 is the number of years in the cycle of solar corrections.
    // 100 is the number of years between solar or lunar corrections.
    //  30 is the number of different epacts (not distinguishing xxv and 25).
    //  29 is the number of different Paschal Full Moon dates.
    //  28 is the day of March one week after the equinox.
    //  25 is the number of centuries in the cycle of lunar corrections.
    //  19 is the number of years in the Metonic cycle.
    //  19 is also the ordinary decrement from one year's epact to the next.
    //  15 is the number of days after the equinox that the Paschal
    //     Full Moon falls, in the year zero.
    //  14 is one hundredth of the year at the start of the first span of
    //     four centuries between lunar corrections.
    //  11 is the number of golden numbers for which epact xxv/25 maps to
    //     a Paschal Full Moon date of April 18th rather than April 17th.
    //   8 is the number of lunar corrections per 25 centuries.
    //   7 is the number of days in the week.
    //   4 is the number of years in the uncorrected leap year cycle.
    //   2 is the number of days that are after the first Sunday after the
    //     equinox, but on or before March 28, in the year zero.

    // Implementation limits:

    // In C and other languages and systems with ordinary fixed-width
    // 32-bit unsigned integer arithmetic, the function fails due to
    // overflow at year 58,714,311, and with 64-bit integers, it fails
    // at year 252,188,329,394,345,111.  In either case, if a "y = y %
    // 5700000" line is added at the start of the function, then correct
    // results will be returned for all possible inputs.

    // In ECMAscript/javascript: the language has no integer division
    // operator, and non-integer division results must somehow be
    // rounded down.  If division results are truncated by using a
    // bitwise logical operation (e.g. "|0") to cause an internal
    // floating-point-to-integer conversion, then the first year for
    // which the function fails is 1,717,986,919, which is when (y * 5 /
    // 4) first exceeds the 31-bit range for unsigned logical integer
    // values.  If division results are truncated using the Math.floor
    // function, then first failure comes at year 123,138,832,709,500,
    // shortly after the sum in the B formula first exceeds the 53-bit
    // positive range over which IEEE 64-bit floating point values have
    // integer precision.  In either case, if a "y = y % 5700000" line
    // is added at the start of the function, then the correct result
    // will be returned for any input that is a non-negative integer.
};

moment.fn.easter = function () {
    return moment.easter(this.year());
};

})(moment);