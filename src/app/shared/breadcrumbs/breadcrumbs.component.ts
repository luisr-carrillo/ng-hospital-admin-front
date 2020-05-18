import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd, Data } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styles: [],
})
export class BreadcrumbsComponent implements OnInit {
    public titulo: string;

    constructor(
        private router: Router,
        private title: Title,
        private meta: Meta
    ) {
        this.getDataRoute().subscribe((data: any) => {
            this.titulo = data.titulo;
            this.title.setTitle(this.titulo);

            const metaDesc: MetaDefinition = {
                name: 'description',
                content: `Bienvenido a la sección ${this.titulo} de Hospital App`,
            };

            this.meta.updateTag(metaDesc);
        });
    }

    ngOnInit(): void {}

    getDataRoute(): Observable<Data> {
        return this.router.events.pipe(
            filter((evento) => evento instanceof ActivationEnd),
            filter(
                (evento: ActivationEnd) => evento.snapshot.firstChild === null
            ),
            map((evento: ActivationEnd) => evento.snapshot.data)
        );
    }
}
