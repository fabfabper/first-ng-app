using Azure.Messaging.ServiceBus;
using Microsoft.AspNetCore.SignalR;

namespace backend
{
    public class ServiceBusConnector
    {
        private readonly string _connectionString;
        private readonly ServiceBusClient _client;
        private readonly ServiceBusProcessor _processor;
        private readonly IHubContext<SignalrHub> _signalrHubContext;

        public ServiceBusConnector(IHubContext<SignalrHub> signalrHub)
        {
            _signalrHubContext = signalrHub;
            // Retrieve configuration values
            _connectionString = "Endpoint=sb://localhost:5672;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=SAS_KEY_VALUE;UseDevelopmentEmulator=true;";

            // Initialize the Service Bus client and processor
            _client = new ServiceBusClient(_connectionString);
            _processor = _client.CreateProcessor("queue.1");
        }

        public async Task StartProcessingAsync()
        {
            // Register message handler
            _processor.ProcessMessageAsync += MessageHandler;
            _processor.ProcessErrorAsync += ErrorHandler;

            // Start processing
            await _processor.StartProcessingAsync();
        }

        public async Task StopProcessingAsync()
        {
            // Stop processing messages
            await _processor.StopProcessingAsync();
            await _processor.DisposeAsync();
            await _client.DisposeAsync();
        }

        private async Task MessageHandler(ProcessMessageEventArgs args)
        {
            try
            {
                string messageBody = args.Message.Body.ToString();
                Console.WriteLine($"Received: {messageBody}");

                // Process the message

                var method = messageBody.Split("#")[0];
                var body = messageBody.Split("#")[1];
                await _signalrHubContext.Clients.All.SendAsync(method, "backend", body);

                // Complete the message to remove it from the queue
                await args.CompleteMessageAsync(args.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
            }
        }

        private Task ErrorHandler(ProcessErrorEventArgs args)
        {
            return Task.CompletedTask;
        }
    }
}
