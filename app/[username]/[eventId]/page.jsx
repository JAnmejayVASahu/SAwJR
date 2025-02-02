import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getEventDetails } from "@/actions/events";
import { getEventAvailability } from "@/actions/availability";
import EventDetails from "./_components/event-details";
import BookingForm from "./_components/booking-form";

export async function generateMetadata({ params }) {
  // Ensure params is resolved before accessing its properties
  const { username, eventId } = await params;

  // Fetch the event details with the resolved params
  const event = await getEventDetails(username, eventId);

  if (!event) {
    return {
      title: "Event Not Found!",
    };
  }

  return {
    title: `Book ${event.title} with ${event.user.name} | Your App Name`,
    description: `Schedule a ${event.duration}-minute ${event.title} event with ${event.user.name}.`,
  };
}

export default async function EventBookingPage({ params }) {
  // Ensure params are resolved
  const { username, eventId } = await params;

  // Fetch event and availability details
  const event = await getEventDetails(username, eventId);
  const availability = await getEventAvailability(eventId);

  // If event is not found, show the 404 not found page
  if (!event) {
    notFound();
  }

  return (
    <div className="flex flex-col justify-center lg:flex-row px-4 py-8">
      <EventDetails event={event} />
      <Suspense fallback={<div>Loading booking form...</div>}>
        <BookingForm event={event} availability={availability} />
      </Suspense>
    </div>
  );
}
