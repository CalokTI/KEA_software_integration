# Documentation for integrating with webhooks.

This webhook got two similar functions. 
One that sends a message to webhooks every 60 seconds and another that does the same but with a randomized timer.

### Intervals
Default interval
interval of 60 seconds

Chaos interval
interval between 1 and 60 seconds picked at random

---

#### Register a new webhook:
POST

url: */webhooks/register

body:
```
{
  endpoint: <your url here>,
  chaos: <1 or 0> !!OPTIONAL!! defaults to 0
}
```
---

#### Update a webhook: 
POST

url: */webhooks/update

body:
```
{
  endpoint: <your url here>,
  chaos: <1 or 0> !!OPTIONAL!! defaults to 0
}
```
---

#### Remove a webhook:
POST

url: */webhooks/remove

body:
```
{
  endpoint: <your url here>
}
```
