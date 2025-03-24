const mySetTimeout = require('../src/mySetTimeout')

// Test helper to measure time execution
function withTimer(testFn) {
    return () => {
        const start = Date.now();
        testFn();
        return Date.now() - start;
    };
}

// Test suite
describe('mySetTimeout', () => {
    it('should execute callback after approximate delay', () => {
        const delay = 100; // 100ms
        let called = false;

        const timedTest = withTimer(() => {
            mySetTimeout(() => {
                called = true;
            }, delay);
        });

        const executionTime = timedTest();

        expect(called).toBe(true);
        expect(executionTime).toBeGreaterThanOrEqual(delay - 5); // allow 5ms margin
        expect(executionTime).toBeLessThan(delay + 20); // shouldn't take much longer
    });

    it('should handle multiple sequential timeouts', () => {
        const results = [];
        const delays = [50, 30, 70];
        let totalTime = 0;

        const timedTest = withTimer(() => {
            delays.forEach(delay => {
                mySetTimeout(() => {
                    results.push(delay);
                }, delay);
                totalTime += delay;
            });
        });

        const executionTime = timedTest();

        expect(results).toEqual(delays); // executed in sequence
        expect(executionTime).toBeGreaterThanOrEqual(totalTime - 10);
        expect(executionTime).toBeLessThan(totalTime + 50);
    });

    it('should execute immediately with 0 delay', () => {
        let called = false;

        const timedTest = withTimer(() => {
            mySetTimeout(() => {
                called = true;
            }, 0);
        });

        const executionTime = timedTest();

        expect(called).toBe(true);
        expect(executionTime).toBeLessThan(5); // should be almost immediate
    });

    it('should block execution until timeout completes', () => {
        let postTimeoutExecuted = false;

        const timedTest = withTimer(() => {
            mySetTimeout(() => {
                // do nothing
            }, 100);
            postTimeoutExecuted = true;
        });

        const executionTime = timedTest();

        expect(postTimeoutExecuted).toBe(true);
        expect(executionTime).toBeGreaterThanOrEqual(100);
    });

    it('should handle callback with parameters', () => {
        let receivedValue = null;

        mySetTimeout((value) => {
            receivedValue = value;
        }, 50, 'test-value');

        expect(receivedValue).toBe('test-value');
    });
});