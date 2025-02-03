#include <iostream>
#include <thread>
#include <vector>
#include <mutex>
#include <condition_variable>
using namespace std;

vector<int> v1 = {1, 2, 3, 4, 5};
vector<int> v2 = {1, 2, 3, 4, 5};
vector<int> products;

bool producerReady = false;
bool producerDone = false;
condition_variable conditionVariable;
mutex mtx;

void producer()
{
    for (int i = 0; i < v1.size(); i++)
    {
        unique_lock<mutex> lock(mtx);
        int result = v1[i] * v2[i];
        products.push_back(result);
        producerReady = true;
        if (i == v1.size() - 1)
            producerDone = true;
        cout << "Producer " << i << ": " << result << endl;

        conditionVariable.notify_one();
    }
}

void consumer()
{
    int scalarProduct = 0;
    for (int i = 0; i < v1.size(); i++)
    {
        unique_lock<mutex> lock(mtx);
        conditionVariable.wait(lock, []
        { return producerReady || producerDone; });
        scalarProduct += products[i];
        producerReady = false;
        cout << "Consumer " << i << ": " << products[i] << endl;
    }
    cout << "Scalar product: " << scalarProduct << endl;
}

int main(int argc, char *argv[])
{
    thread producerThread(producer);
    thread consumerThread(consumer);

    producerThread.join();
    consumerThread.join();

    return 0;
}