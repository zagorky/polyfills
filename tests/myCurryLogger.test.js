const curryLogger = require('../src/myCurryLogger');

describe('curryLogger', () => {
    // Mock console.log for testing
    let originalConsoleLog;
    let loggedMessages;

    beforeEach(() => {
        originalConsoleLog = console.log;
        loggedMessages = [];
        console.log = jest.fn((...args) => {
            loggedMessages.push(args.join(' '));
            originalConsoleLog.apply(console, args);
        });
    });

    afterEach(() => {
        console.log = originalConsoleLog;
    });

    it('should curry a simple logging function', () => {
        const logMessage = (prefix, message) => {
            console.log(`${prefix}: ${message}`);
        };

        const curriedLog = curryLogger(logMessage);
        const logWithPrefix = curriedLog('[INFO]');
        logWithPrefix('System started');

        expect(loggedMessages).toEqual(['[INFO]: System started']);
    });

    it('should handle multiple currying steps', () => {
        const logDetails = (level, timestamp, component, message) => {
            console.log(`[${level}] ${timestamp} ${component}: ${message}`);
        };

        const curriedLog = curryLogger(logDetails);
        const logWithLevel = curriedLog('ERROR');
        const logWithTime = logWithLevel('2023-01-01');
        logWithTime('Database', 'Connection failed');

        expect(loggedMessages).toEqual([
            '[ERROR] 2023-01-01 Database: Connection failed'
        ]);
    });

    it('should work with immediate full arguments', () => {
        const logMessage = (level, message) => {
            console.log(`[${level}] ${message}`);
        };

        const curriedLog = curryLogger(logMessage);
        curriedLog('WARN', 'Disk space low');

        expect(loggedMessages).toEqual(['[WARN] Disk space low']);
    });

    it('should maintain context when currying', () => {
        const logger = {
            prefix: 'APP',
            log(level, message) {
                console.log(`${this.prefix} [${level}]: ${message}`);
            }
        };

        const curriedLog = curryLogger(logger.log.bind(logger));
        const logError = curriedLog('ERROR');
        logError('Critical failure');

        expect(loggedMessages).toEqual(['APP [ERROR]: Critical failure']);
    });

    it('should handle functions with no arguments', () => {
        const logHello = () => {
            console.log('Hello, world!');
        };

        const curriedLog = curryLogger(logHello);
        curriedLog();

        expect(loggedMessages).toEqual(['Hello, world!']);
    });

    it('should allow multiple calls with partial arguments', () => {
        const logTransaction = (source, amount, currency) => {
            console.log(`Transaction: ${source} ${amount} ${currency}`);
        };

        const curriedLog = curryLogger(logTransaction);
        const logUSD = curriedLog('Payment')('100');
        logUSD('USD');
        logUSD('EUR'); // Reuses first two arguments

        expect(loggedMessages).toEqual([
            'Transaction: Payment 100 USD',
            'Transaction: Payment 100 EUR'
        ]);
    });

    it('should handle edge cases like null/undefined arguments', () => {
        const logValue = (label, value) => {
            console.log(`${label}: ${value}`);
        };

        const curriedLog = curryLogger(logValue);
        const logNull = curriedLog(null);
        logNull(undefined);

        expect(loggedMessages).toEqual(['null: undefined']);
    });
});