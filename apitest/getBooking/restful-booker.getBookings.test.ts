import { expect, test } from "playwright/test";
import bookingData = require("../../test-data/booking.json");

test.beforeEach("Create Booking", async ({ request, baseURL }) => {
  const response = await request.post(`${baseURL}/booking`, {
    data: bookingData,
  });
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  const responseBody = await response.json();
  process.env.BOOKING_ID_4 = responseBody.bookingid;
});

test("Get BookingIds", async ({ request, baseURL }) => {
  const response = await request.get(`${baseURL}/booking`);
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  let responseAsString = await response.body().then((b) => {
    let data = JSON.parse(b.toString());
    return data.filter(
      (d: { bookingid: string | undefined }) =>
        d.bookingid == process.env.BOOKING_ID_4
    );
  });

  let ID = process.env.BOOKING_ID_4;
  const a = ID;
  if (a) {
    expect(responseAsString[0]).toHaveProperty("bookingid", +a);
  }
});
