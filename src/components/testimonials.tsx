/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote, Star, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getTestimonials } from "@/lib/actions/testimonial.action";
import {
  Testimonial,
  TestimonialStatus,
} from "@/lib/domains/testimonial.domain";

// Helper function to generate avatar initials
const generateAvatar = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const result = await getTestimonials(3); // Limit to 3 for display

        if (result.error) {
          setError(result.error);
        } else {
          // Filter for approved testimonials only
          const approvedTestimonials =
            result.data?.filter(
              (testimonial: any) =>
                testimonial.status === TestimonialStatus.ACTIVE
            ) || [];
          setTestimonials(approvedTestimonials as unknown as Testimonial[]);
        }
      } catch {
        setError("Failed to load testimonials");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-space-grotesk mb-4">
              Client <span className="gradient-text">Success Stories</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover how our clients are achieving their financial goals with
              ChainRent
            </p>
          </div>
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-space-grotesk mb-4">
              Client <span className="gradient-text">Success Stories</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover how our clients are achieving their financial goals with
              ChainRent
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-red-400">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-space-grotesk mb-4">
            Client <span className="gradient-text">Success Stories</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover how our clients are achieving their financial goals with
            ChainRent
          </p>
        </div>

        {testimonials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No testimonials available</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.$id}
                className="glass-card hover-lift relative"
              >
                <CardContent className="p-8">
                  <Quote className="h-8 w-8 text-indigo-400 mb-4" />

                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed italic">
                    &quot;{testimonial.content}&quot;
                  </p>

                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="gradient-bg text-white font-semibold">
                        {generateAvatar(testimonial.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-green-400 text-sm">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
