import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Domain } from '../domain';

@Component({
  selector: 'app-display-tree',
  templateUrl: './display-tree.component.html',
  styleUrls: ['./display-tree.component.scss']
})
export class DisplayTreeComponent implements OnChanges {

  @Input()
  set treeObj(arr: any) {
    this.tree = arr;
  }

  get treeObj(): any {
    return this.tree;
  }
  tree: [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.init();
  }

  init(): void {
    if(this.treeObj !== null && this.treeObj.length > 0) {
      this.tree = this.createTree(this.treeObj);
      this.consoleTree(this.tree, '  ');
    }
  }

  createTree(domains: Domain[]): any {
    const domainsArr = domains.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
    const tree = [];

    domainsArr.map(domain => {
      this.createLeaf(domain, tree);
    });

    console.log(tree);
    return tree;
  }

  createLeaf(domain: Domain, tree: any[]): void {
    let isRoot = true;
    let domainNodes: string[] = domain.name.split('/').filter(i => i);
    // ex: domainNodes['prefix12', 'name3', 'name1']
    //     domainNodes['name3', 'name1']

    if(tree.length > 0) {

      domainNodes = domain.name.split('/').filter(i => i);

      tree.forEach(item => {

        if(item.node === domainNodes[0]) { // item exists in tree

          // don't add it to root tree
          isRoot = false;

          // add it to its parent
          domainNodes.shift();
          const pathStr = domainNodes.join('/');

          if(pathStr !== '') {
            let childExist = false;

            item.children.forEach(i => {
              // console.log('> item.child', i, ' vs domainNodes[0]', domainNodes[0]);
              childExist = (i.node === domainNodes[0]);
            });
            if(!childExist) {
              item.children.push({
                node: domainNodes[0],
                // id: domain.id,
                // desc: domain.desc,
                // _display: domain._display,
                children: []
              });
            }

            if(domainNodes.length > 0) {
              const newDomain = {
                id: domain.id,
                parentId: domain.parentId,
                desc: domain.desc,
                _display: domain._display,
                name: pathStr
              };
              this.createLeaf(newDomain, item.children);
            }
          }

        }
      });
    }

    if(isRoot) {
      tree.push({node: domainNodes[0], children: []});
    }
  }

  consoleTree(tree: any[], idx: string): void {
    for(const leaf of tree) {
      console.log(`${idx} • ${leaf.node}`);
      if(leaf.children.length > 0) {
        idx += '  ';
        this.consoleTree(leaf.children, idx);
        idx = '  ';
      }
    }
  }

}
