import Link from "next/link"
import { Atom, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-secondary/30 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Site Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                <Atom className="size-5 text-primary" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-foreground">
                Rare Earth Database
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Curating and visualizing rare-earth element properties for scientific discovery.
            </p>
            <p className="mt-3 text-sm font-medium text-foreground">
              Hosted by the Ke Lab
            </p>
            <p className="text-sm text-muted-foreground">University of Materials Science</p>
          </div>
          
          {/* Column 2: Research & Tools */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Research & Tools
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/materials" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Browse Materials
                </Link>
              </li>
              <li>
                <Link href="/apps" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Data Visualization Apps
                </Link>
              </li>
              <li>
                <Link href="/api-docs" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  API Access & Documentation
                </Link>
              </li>
              <li>
                <Link href="/publications" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Research Publications
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <a href="mailto:rareearthdb@university.edu" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  rareearthdb@university.edu
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Department of Materials Science<br />
                  123 University Ave, Building 4<br />
                  Research City, RC 12345
                </span>
              </li>
            </ul>
            
            {/* Map Placeholder */}
            <div className="mt-4 aspect-video overflow-hidden rounded-lg border border-border bg-muted">
              <div className="flex size-full items-center justify-center text-xs text-muted-foreground">
                <MapPin className="mr-1 size-4" />
                Map Location
              </div>
            </div>
          </div>
          
          {/* Column 4: Team & Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Team & Legal
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/team" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Meet the Research Team
                </Link>
              </li>
              <li>
                <Link href="/funding" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Research Project Funding
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/cite" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  How to Cite the Database
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Rare Earth Database. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Developed by the Ke Lab Research Group
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
