using Lab4.Implementation;
using System.Diagnostics;

public class Program
{
    static void Main()
    {
        Stopwatch stopwatch = new Stopwatch();
        var hosts = new List<string>
        {
            "example.com",                          // Standard example domain
            "example.com/about",                    // Example domain with a specific endpoint
            "jsonplaceholder.typicode.com/users",   // Public test API, users endpoint
            "httpbin.org/get",                      // HTTP testing endpoint, responds with request details
            "httpbin.org/headers",                  // Returns request headers sent
            "httpbin.org/status/404",               // Returns HTTP 404 status code for error testing
        };


        Console.WriteLine("-----DIRECT CALLBACK-----");
        stopwatch.Start();
        DirectCallback.Run(hosts);
        stopwatch.Stop();
        TimeSpan directCallbackTime = stopwatch.Elapsed;

        Console.WriteLine("-----TASKS-----");
        stopwatch.Restart();
        TaskMechanism.Run(hosts);
        stopwatch.Stop();
        TimeSpan taskMechanismTime = stopwatch.Elapsed;


        Console.WriteLine("-----ASYNC/AWAIT TASKS-----");
        stopwatch.Restart();
        AsyncTaskMechanism.Run(hosts);
        stopwatch.Stop();
        TimeSpan asyncTaskMechanismTime = stopwatch.Elapsed;

        Console.WriteLine("Direct callback: {0}", directCallbackTime);
        Console.WriteLine("Task mechanism: {0}", taskMechanismTime);
        Console.WriteLine("Async task mechanism: {0}", asyncTaskMechanismTime);
    }
}
