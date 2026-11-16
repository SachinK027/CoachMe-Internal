"use client";

import { PageHeader, Badge } from "@/components/ui";

const services = [
  {
    title: "Strategic Introduction Call",
    slug: "strategic-introduction-call",
    price: "Complimentary",
    status: "Published",
  },
  {
    title: "Business Operations Advisory",
    slug: "business-operations-advisory",
    price: "Custom",
    status: "Published",
  },
  {
    title: "Teams Advisory & Workshops",
    slug: "teams-advisory-workshops",
    price: "Custom",
    status: "Published",
  },
  {
    title: "1:1 Exclusive Advisory",
    slug: "1-1-exclusive-advisory",
    price: "8,000 AED",
    status: "Published",
  },
];

export default function ServicesAdminPage() {
  return (
    <div>
      <PageHeader
        title="Services"
        description="Published advisory services available on the public website."
        actions={
          <button type="button" className="btn btn-primary">
            + Add service
          </button>
        }
      />
      <section className="card table-wrap">
        <table className="data">
          <thead>
            <tr>
              <th>Service</th>
              <th>Slug</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.slug}>
                <td>
                  <strong>{service.title}</strong>
                </td>
                <td>{service.slug}</td>
                <td>{service.price}</td>
                <td>
                  <Badge tone="success">{service.status}</Badge>
                </td>
                <td>
                  <button type="button" className="btn btn-secondary">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
