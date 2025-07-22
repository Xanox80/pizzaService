import { MenuItem } from 'primeng/api';
import { Pizza } from '../../../models/edit-pizza.module';
import { Worker } from '../../../models/workers-dashboard.models';
import { DiscountService } from '../../../services/discount/discount.service';
import { PanelMenuMultipleDemo } from '../dashboard.component';
import { Admin } from '../../../models/admin-model';

export class DashboardMenuBuilder {
  static buildMenu(
    pizzas: Pizza[],
    workers: Worker[],
    admins: Admin[],
    discountService: DiscountService,
    component: PanelMenuMultipleDemo,
    role: 'admin' | 'cook' | 'warehouse' | 'user'
  ): MenuItem[] {
    const menu: MenuItem[] = [];

    menu.push({
      label: 'Соціальні мережі',
      icon: 'pi pi-share-alt',
      items: [
        {
          label: 'Instagram',
          icon: 'pi pi-instagram',
          url: 'https://www.instagram.com',
        },
        {
          label: 'Twitter',
          icon: 'pi pi-twitter',
          url: 'https://www.twitter.com',
        },
        {
          label: 'Facebook',
          icon: 'pi pi-facebook',
          url: 'https://www.facebook.com',
        },
        {
          label: 'Tik-Tok',
          icon: 'pi pi-tiktok',
          url: 'https://www.tiktok.com',
        },
        {
          label: 'YouTube',
          icon: 'pi pi-youtube',
          url: 'https://www.youtube.com',
        },
      ],
    });

    if (role === 'admin') {
      menu.push(
        {
          label: 'Закази які обробляються',
          icon: 'pi pi-shopping-cart',
          command: () => (component.selectedSection = 'pizzaOrders'),
        },
        {
          label: 'Відгуки та поради',
          icon: 'pi pi-comments',
          command: () => (component.selectedSection = 'feedback'),
        },
        {
          label: 'Склад продуктів',
          icon: 'pi pi-warehouse',
          command: () => (component.selectedSection = 'ingredients'),
        },
        {
          label: 'Logs',
          icon: 'pi pi-shield',
          items: [
            {
              label: 'Log Feedbacks',
              icon: 'pi pi-eye',
              command: () => (component.selectedSection = 'logFeedbacks'),
            },
            {
              label: 'Log Edit Pizza',
              icon: 'pi pi-eye',
              command: () => (component.selectedSection = 'LogPizza'),
            },
            {
              label: 'Log Product Remove',
              icon: 'pi pi-eye',
              command: () => (component.selectedSection = 'logProductRemove'),
            },
          ],
        },
        {
          label: 'Статистика',
          icon: 'pi pi-chart-bar',
          items: [
            {
              label: 'Кількість замовлень',
              icon: 'pi pi-calendar',
              command: () => (component.selectedSection = 'orders'),
            },
            {
              label: 'Найпопулярніші піци',
              icon: 'pi pi-star',
              command: () => (component.selectedSection = 'popular'),
            },
            {
              label: 'Середній чек',
              icon: 'pi pi-wallet',
              command: () => (component.selectedSection = 'average'),
            },
          ],
        },
        {
          label: 'Редагування піц',
          icon: 'pi pi-pencil',
          items: pizzas.map((pizza) => ({
            label: pizza.name,
            icon: 'pi pi-file-edit',
            routerLink: ['/products', pizza.id],
          })),
        },
        {
          label: 'Додавання піци',
          icon: 'pi pi-plus',
          routerLink: ['/products/new'],
        },
        {
          label: 'Переглянути існуючі піци',
          icon: 'pi pi-arrow-left',
          command: () => component.goBack(),
        },
        {
          label: 'Найкращий покупець',
          icon: 'pi pi-user',
          command: () => (component.selectedSection = 'bestCustomer'),
        },
        {
          label: 'Найкращий працівник',
          icon: 'pi pi-users',
          command: () => (component.selectedSection = 'bestEmployee'),
        },
        {
          label: 'Працівники',
          icon: 'pi pi-users',
          items: workers.map((worker) => ({
            label: worker.name,
            icon: 'pi pi-user',
            command: () => {
              component.selectedSection = 'workers';
              component.selectedWorker = worker;
            },
          })),
        },
        {
          label: 'Акція на піци',
          icon: 'pi pi-tag',
          items: [
            {
              label: 'Мега знижка',
              icon: 'pi pi-gift',
              command: () => {
                component.selectedSection = 'megaDiscount';
                discountService.setDiscount('secondPizza50');
              },
            },
            {
              label: 'Акція на третю піцу',
              icon: 'pi pi-clock',
              command: () => {
                component.selectedSection = 'megaDiscountEnd';
                discountService.setDiscount('thirdPizza60');
              },
            },
          ],
        },
        {
          label: 'Адміни',
          icon: 'pi pi-users',
          items: admins.map((admin) => ({
            label: admin.name,
            icon: 'pi pi-user',
            command: () => {
              component.selectedSection = 'admins';
              component.SelectedAdmins = admin;
            },
          })),
        }
      );
    }
    if (role === 'cook') {
      menu.push(
        {
          label: 'Склад продуктів',
          icon: 'pi pi-warehouse',
          command: () => (component.selectedSection = 'ingredients'),
        },
        {
          label: 'Кількість замовлень',
          icon: 'pi pi-calendar',
          command: () => (component.selectedSection = 'orders'),
        },

        {
          label: 'Закази які обробляються',
          icon: 'pi pi-shopping-cart',
          command: () => (component.selectedSection = 'pizzaOrders'),
        },
        {
          label: 'Відгуки та поради',
          icon: 'pi pi-comments',
          command: () => (component.selectedSection = 'feedback'),
        },
        {
          label: 'Найкращий працівник',
          icon: 'pi pi-users',
          command: () => (component.selectedSection = 'bestEmployee'),
        }
      );
    }

    if (role === 'warehouse') {
      menu.push(
        {
          label: 'Склад',
          icon: 'pi pi-warehouse',
          command: () => (component.selectedSection = 'ingredients'),
        },
        {
          label: 'Найкращий працівник',
          icon: 'pi pi-users',
          command: () => (component.selectedSection = 'bestEmployee'),
        }
      );
    }
    return menu;
  }
}
