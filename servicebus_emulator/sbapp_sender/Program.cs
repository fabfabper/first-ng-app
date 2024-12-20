using Azure.Messaging.ServiceBus;

// the client that owns the connection and can be used to create senders and receivers
ServiceBusClient client;

// the sender used to publish messages to the queue
ServiceBusSender sender;

// number of messages to be sent to the queue
const int numOfMessages = 3;

client = new ServiceBusClient(
    "Endpoint=sb://localhost:5672;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=SAS_KEY_VALUE;UseDevelopmentEmulator=true;");
sender = client.CreateSender("queue.1");


try
{
    while (true)
    {
        // create a batch 
        using ServiceBusMessageBatch messageBatch = await sender.CreateMessageBatchAsync();

        Console.WriteLine("Enter message:");
        string userMessage = Console.ReadLine();
        // try adding a message to the batch
        if (!messageBatch.TryAddMessage(new ServiceBusMessage(userMessage)))
        {
            // if it is too large for the batch
            throw new Exception("The message is too large to fit in the batch.");
        }

        // Use the producer client to send the batch of messages to the Service Bus queue
        await sender.SendMessagesAsync(messageBatch);
        Console.WriteLine($"A batch of {numOfMessages} messages has been published to the queue.");
    }
}
catch (Exception ex)
{
    Console.WriteLine(ex);
}
finally
{
    await sender.DisposeAsync();
    await client.DisposeAsync();
}

Console.ReadKey();
