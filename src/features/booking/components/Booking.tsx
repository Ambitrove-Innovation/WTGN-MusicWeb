import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toastManager } from "@/components/ui/toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { List, ListItem } from "@/components/ui/list";
import {
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress, ProgressIndicator, ProgressTrack } from "@/components/ui/progress";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import submitForm from "@/backend/functions/contactPage";
import getHtmlBody from "@/backend/template/contactFormTemplate";

const initialFormState = {
  name: "",
  email: "",
  eventType: "Live Show",
  eventDate: "",
  venue: "",
  message: "",
  subject: "Ambitrove's new Mailing System for Clients"
};

export function Booking() {
  const [formData, setFormData] = useState(initialFormState);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const fieldStyle =
    "bg-white/5 text-white placeholder:text-white/50 border border-white/10 shadow-sm shadow-white/10 focus:border-green-300/50 focus-visible:ring-2 focus-visible:ring-green-300/20 focus-visible:outline-none focus-visible:bg-black data-[state=open]:bg-black data-[state=open]:text-white data-[state=open]:border-white/10";

  const labelClass = "text-white";

  const formatEventDate = (date?: Date) =>
    date
      ? date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "Pick a date";

  const handleChange = (
    field: keyof typeof initialFormState,
    value: string,
  ) => {
    setFormData((current: any) => ({ ...current, [field]: value }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setFormData((current: any) => ({
      ...current,
      eventDate: date ? date.toISOString().slice(0, 10) : "",
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.venue) {
      toastManager.add({
        title: "Submission issue",
        description: "Please provide your name, email, and venue details.",
        type: "error",
      });
      return;
    }

    const clientEmail = (import.meta as ImportMeta & {
      env: { VITE_CLIENT_EMAIL: string };
    }).env.VITE_CLIENT_EMAIL;

    const clientName = (import.meta as ImportMeta & {
      env: { VITE_CLIENT_NAME: string };
    }).env.VITE_CLIENT_NAME;

    const htmlContent = getHtmlBody(
      formData.email,
      formData.name,
      formData.eventType,
      formData.eventDate,
      formData.venue,
      formData.message
    );

    await submitForm(clientEmail, clientName, formData.subject, htmlContent);

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      toastManager.add({
        title: "Request sent",
        description:
          "Booking request received. Our team will reach out with availability, rates, and production support.",
        type: "success",
      });
      setFormData(initialFormState);
    }, 700);
  };

  return (
    <section
      id="booking"
      className="py-32 px-6 md:px-12 bg-[#050505] text-white">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-[1340px] mx-auto grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
        <div>
          <div className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-white/40 mb-6">
            // Book W.T.G.N
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-6">
            Book W.T.G.N for your next live event, festival, or private show.
          </h2>
          <p className="max-w-[620px] text-green-300 font-semibold uppercase tracking-[0.2em] mb-4">
            Priority booking available for fast responses and premium event
            support.
          </p>
          <p className="max-w-[620px] text-white/60 leading-[1.8] font-light mb-8">
            Whether it’s a headline set, brand activation, or private party,
            W.T.G.N brings high-energy performance, soulful storytelling, and a
            crowd-moving live experience.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href="mailto:bookings@wtgnmusic.com?subject=Booking%20Request"
              className="inline-flex items-center justify-center rounded-full bg-white text-black py-4 px-6 text-[0.78rem] font-semibold uppercase tracking-[0.1em] transition hover:bg-white/90">
              Send a Booking Request
            </a>
            <a
              href="tel:+27712345678"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 py-4 px-6 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-white/10">
              Call for a Performance
            </a>
          </div>
        </div>

        <Card className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
          <CardHeader className="border-b border-white/10 pb-6">
            <div className="font-sans text-[0.75rem] tracking-[0.2em] uppercase text-green-300 mb-3">
              Booking Request
            </div>
            <CardTitle className="text-3xl font-bold text-white">
              Ready to book W.T.G.N?
            </CardTitle>
            <CardDescription className="mt-4 text-white/70">
              Share your event details and receive fast, priority booking
              support.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-8">
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="booking-name" className={labelClass}>
                    Your Name
                  </Label>
                  <Input
                    id="booking-name"
                    placeholder="Full name"
                    className={fieldStyle}
                    required
                    value={formData.name}
                    onChange={(event) =>
                      handleChange("name", event.target.value)
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="booking-email" className={labelClass}>
                    Email Address
                  </Label>
                  <Input
                    id="booking-email"
                    type="email"
                    placeholder="you@example.com"
                    className={fieldStyle}
                    required
                    value={formData.email}
                    onChange={(event) =>
                      handleChange("email", event.target.value)
                    }
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="booking-event-type" className={labelClass}>
                    Event Type
                  </Label>
                  <Select
                    id="booking-event-type"
                    value={formData.eventType}
                    onValueChange={(value) => handleChange("eventType", value)}>
                    <SelectTrigger className={`${fieldStyle} min-h-11`}>
                      <SelectValue
                        className="text-white"
                        placeholder="Select event type"
                      />
                    </SelectTrigger>
                    <SelectPopup>
                      <SelectItem value="Live Show">Live Show</SelectItem>
                      <SelectItem value="Private Party">
                        Private Party
                      </SelectItem>
                      <SelectItem value="Corporate Event">
                        Corporate Event
                      </SelectItem>
                      <SelectItem value="Studio Session">
                        Studio Session
                      </SelectItem>
                    </SelectPopup>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <Label htmlFor="booking-event-date" className={labelClass}>
                      Event Date
                    </Label>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                      Tap to choose
                    </span>
                  </div>
                  <Popover>
                    <PopoverTrigger className="inline-flex items-center justify-between rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-left text-white outline-none transition hover:bg-white/10 hover:border-white/20 focus:ring-2 focus:ring-green-300/40 data-[state=open]:bg-black data-[state=open]:text-white">
                      <span className="text-white">
                        {formatEventDate(selectedDate)}
                      </span>
                      <CalendarDays className="size-4 text-white/70" />
                    </PopoverTrigger>
                    <PopoverPopup
                      side="bottom"
                      align="start"
                      className="w-[min(360px,100vw)]">
                      <div className="space-y-3 p-4">
                        <PopoverTitle>Select Event Date</PopoverTitle>
                        <PopoverDescription>
                          Use the calendar to pick a date for your booking.
                        </PopoverDescription>
                        <Calendar
                          selected={selectedDate}
                          onSelect={handleDateSelect}
                          mode="single"
                        />
                      </div>
                    </PopoverPopup>
                  </Popover>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="booking-venue" className={labelClass}>
                  Venue or Location
                </Label>
                <Input
                  id="booking-venue"
                  placeholder="Venue name or address"
                  className={fieldStyle}
                  required
                  value={formData.venue}
                  onChange={(event) =>
                    handleChange("venue", event.target.value)
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="booking-message" className={labelClass}>
                  Message
                </Label>
                <Textarea
                  id="booking-message"
                  placeholder="Tell us what you need from W.T.G.N"
                  className={`min-h-37.5 ${fieldStyle}`}
                  value={formData.message}
                  onChange={(event) =>
                    handleChange("message", event.target.value)
                  }
                />
              </div>

              <Button
                type="submit"
                loading={loading}
                className="w-full bg-green-300 text-black hover:bg-green-200">
                Request Booking
              </Button>

              {loading ? (
                <Progress value={null} className="mt-4">
                  <span className="sr-only">Submitting booking request</span>
                  <ProgressTrack className="h-2 overflow-hidden rounded-full bg-white/10">
                    <ProgressIndicator className="bg-green-300 h-full" />
                  </ProgressTrack>
                </Progress>
              ) : null}
            </form>
          </CardContent>

          <CardFooter className="mt-6 border-t border-white/10 pt-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-green-300">
                  What we can do
                </p>
                <List className="space-y-2 text-sm text-white/70">
                  <ListItem>• Full concert and festival bookings</ListItem>
                  <ListItem>
                    • Corporate and private event performances
                  </ListItem>
                  <ListItem>
                    • Brand campaigns, activations, and collaborations
                  </ListItem>
                  <ListItem>
                    • Studio sessions, guest features, and co-writes
                  </ListItem>
                </List>
              </div>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-green-300">
                  Why book W.T.G.N
                </p>
                <p className="text-sm text-white/70 leading-7">
                  They deliver polished stagecraft, authentic storytelling, and
                  a versatile set that works for local audiences, corporate
                  stages, and festival crowds alike.
                </p>
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </section>
  );
}
